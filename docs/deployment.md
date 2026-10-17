# Windows Server 生产部署

生产环境部署在阿里云 Windows Server，保持单一公网入口：

```text
浏览器
   ↓
Nginx for Windows
   ├─ /          → frontend/dist
   └─ /api/      → Waitress（127.0.0.1:8000）→ Django
```

Gunicorn 不支持 Windows，因此生产依赖使用 Waitress。Waitress 只监听本机回环地址，公网仅开放 Nginx 的 80/443 端口。

以下示例使用固定路径：

- 项目：`C:\Sites\Echo_web`
- Nginx：`C:\nginx`
- 生产环境变量：`C:\EchoSim\echosim.env.ps1`

## 一、服务器前置软件

安装并加入 `PATH`：

- Git for Windows
- Python 3.11 或更高版本
- Node.js 22
- pnpm
- Nginx for Windows

管理员 PowerShell 中检查：

```powershell
git --version
python --version
node --version
pnpm --version
```

如缺少 pnpm：

```powershell
npm install -g pnpm
```

将 Nginx 官方 ZIP 解压并整理到 `C:\nginx`。

## 二、首次拉取与构建

```powershell
New-Item -ItemType Directory -Force C:\Sites
Set-Location C:\Sites
git clone https://github.com/jzy23/Echo_web.git
Set-Location C:\Sites\Echo_web

python -m venv .venv
.\.venv\Scripts\python.exe -m pip install --upgrade pip
.\.venv\Scripts\python.exe -m pip install -r requirements-production.txt
.\.venv\Scripts\python.exe manage.py migrate
.\.venv\Scripts\python.exe manage.py collectstatic --noinput
.\.venv\Scripts\python.exe manage.py check
.\.venv\Scripts\python.exe manage.py test

Set-Location frontend
pnpm install --frozen-lockfile
pnpm build
Set-Location ..
```

如果仓库为私有仓库，服务器应使用 GitHub 只读 Deploy Key，避免在服务器保存个人账号密码。

## 三、生产环境变量

生成随机密钥：

```powershell
python -c "import secrets; print(secrets.token_urlsafe(64))"
```

复制示例文件到仓库外部：

```powershell
New-Item -ItemType Directory -Force C:\EchoSim
Copy-Item .\deploy\windows\echosim.env.ps1.example C:\EchoSim\echosim.env.ps1
notepad C:\EchoSim\echosim.env.ps1
```

将其中的公网 IP、域名和随机密钥替换为真实值。该文件包含生产密钥，不得复制回仓库或提交 Git。

首次仅使用公网 IP 和 HTTP 验证时，保持 HTTPS、Secure Cookie 和 HSTS 开关关闭。配置证书后再启用相关安全项。

## 四、启动 Waitress

手动验证：

```powershell
Set-Location C:\Sites\Echo_web
powershell -NoProfile -ExecutionPolicy Bypass -File .\deploy\windows\start-waitress.ps1
```

另开一个 PowerShell 窗口测试：

```powershell
curl.exe http://127.0.0.1:8000/api/site-config/
```

测试通过后注册开机任务：

```powershell
$action = New-ScheduledTaskAction `
    -Execute "powershell.exe" `
    -Argument '-NoProfile -ExecutionPolicy Bypass -File "C:\Sites\Echo_web\deploy\windows\start-waitress.ps1"'

$trigger = New-ScheduledTaskTrigger -AtStartup

Register-ScheduledTask `
    -TaskName "EchoSim-Django" `
    -Action $action `
    -Trigger $trigger `
    -User "SYSTEM" `
    -RunLevel Highest

Start-ScheduledTask -TaskName "EchoSim-Django"
```

## 五、配置 Nginx

仓库提供了基础配置。首次安装时复制到 Nginx：

```powershell
Copy-Item C:\Sites\Echo_web\deploy\windows\nginx.conf C:\nginx\conf\nginx.conf -Force
Set-Location C:\nginx
.\nginx.exe -t
Start-Process .\nginx.exe
```

测试统一入口：

```powershell
curl.exe http://127.0.0.1/
curl.exe http://127.0.0.1/api/site-config/
```

注册 Nginx 开机任务：

```powershell
$action = New-ScheduledTaskAction `
    -Execute "C:\nginx\nginx.exe" `
    -WorkingDirectory "C:\nginx"

$trigger = New-ScheduledTaskTrigger -AtStartup

Register-ScheduledTask `
    -TaskName "EchoSim-Nginx" `
    -Action $action `
    -Trigger $trigger `
    -User "SYSTEM" `
    -RunLevel Highest
```

Nginx 配置中的 Windows 路径必须使用正斜杠，例如 `C:/Sites/Echo_web/frontend/dist`。

## 六、防火墙与安全组

Windows 防火墙开放 HTTP：

```powershell
New-NetFirewallRule `
    -DisplayName "EchoSim HTTP" `
    -Direction Inbound `
    -Protocol TCP `
    -LocalPort 80 `
    -Action Allow
```

阿里云安全组开放 80；配置 HTTPS 后再开放 443。远程桌面 3389 只允许管理员固定 IP，不开放 Waitress 的 8000 端口。

## 七、后续更新

本机完成修改并推送 GitHub 后，在服务器管理员 PowerShell 执行：

```powershell
Set-Location C:\Sites\Echo_web
git pull --ff-only origin main

.\.venv\Scripts\python.exe -m pip install -r requirements-production.txt
.\.venv\Scripts\python.exe manage.py migrate
.\.venv\Scripts\python.exe manage.py collectstatic --noinput
.\.venv\Scripts\python.exe manage.py check

Set-Location frontend
pnpm install --frozen-lockfile
pnpm build
Set-Location ..

Stop-ScheduledTask -TaskName "EchoSim-Django" -ErrorAction SilentlyContinue
Start-Sleep -Seconds 2
Start-ScheduledTask -TaskName "EchoSim-Django"
```

前端构建完成后 Nginx 会直接读取新文件，不需要重启。仅在修改 `nginx.conf` 后执行：

```powershell
Set-Location C:\nginx
.\nginx.exe -t
.\nginx.exe -s reload
```

## 八、故障排查

```powershell
Get-ScheduledTask -TaskName "EchoSim-Django", "EchoSim-Nginx"
Get-Process nginx -ErrorAction SilentlyContinue
Get-Content C:\nginx\logs\error.log -Tail 100
curl.exe http://127.0.0.1:8000/api/site-config/
curl.exe http://127.0.0.1/api/site-config/
```

先确认公网 IP 的 HTTP 访问正常，再继续配置域名、ICP备案、HTTPS 证书和 HSTS。
