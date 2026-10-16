# 生产部署

生产环境保持单一入口，由 Nginx 分发前端静态资源和 Django API：

```text
浏览器
   ↓
Nginx
   ├─ /          → frontend/dist
   └─ /api/      → Gunicorn → Django
```

当前配置接口继续使用 Django `JsonResponse`，不引入 Django REST Framework。出现后台内容管理、表单提交、案例 CRUD、认证或文件上传后，再评估 DRF。

## 更新流程

```bash
git pull --ff-only origin main

source .venv/bin/activate
pip install -r requirements-production.txt
python manage.py migrate
python manage.py collectstatic --noinput

cd frontend
pnpm install --frozen-lockfile
pnpm build
cd ..

sudo systemctl restart echosim
sudo systemctl reload nginx
```

## Django 环境变量

生产环境至少配置：

```bash
DJANGO_DEBUG=false
DJANGO_SECRET_KEY=<随机长密钥>
DJANGO_ALLOWED_HOSTS=www.example.com,example.com
DJANGO_SECURE_SSL_REDIRECT=true
DJANGO_SESSION_COOKIE_SECURE=true
DJANGO_CSRF_COOKIE_SECURE=true
DJANGO_SECURE_HSTS_SECONDS=31536000
DJANGO_SECURE_HSTS_INCLUDE_SUBDOMAINS=true
DJANGO_SECURE_HSTS_PRELOAD=true
```

建议由 systemd 的 `EnvironmentFile` 读取这些值，不要把密钥提交到仓库。

开发环境默认不强制 HTTPS，安全 Cookie 和 HSTS 也默认关闭。生产环境必须设置
`DJANGO_SECRET_KEY`，否则 Django 会在启动时明确失败。只有确认主域名和所有需要覆盖的
子域名均已全站启用 HTTPS 后，才能设置 `DJANGO_SECURE_HSTS_SECONDS`；首次启用时可先用
较短时间验证，再逐步提高。`includeSubDomains` 和 `preload` 的影响更难撤销，启用前应单独评估。

## Gunicorn 服务示例

```ini
[Unit]
Description=EchoSim Django service
After=network.target

[Service]
User=www-data
Group=www-data
WorkingDirectory=/srv/echosim
EnvironmentFile=/etc/echosim.env
ExecStart=/srv/echosim/.venv/bin/gunicorn --workers 3 --bind 127.0.0.1:8000 config.wsgi:application
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

## Nginx 示例

```nginx
server {
    listen 80;
    server_name www.example.com example.com;

    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name www.example.com example.com;

    ssl_certificate /path/to/your/fullchain.pem;
    ssl_certificate_key /path/to/your/privkey.pem;

    root /srv/echosim/frontend/dist;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api/ {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

证书的申请、续期和权限管理由部署环境负责；此处只展示 Nginx 配置，不安装或调用 Certbot。

