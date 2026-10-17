# EchoSim Web

EchoSim 官网的可运行静态首页，采用 Vue 3 + Vite 前端和 Django 配置 API。当前首页包含 Hero、研发流程、核心能力、应用场景、案例演示、技术证据、联系转化和页脚，并适配桌面端与移动端。

## 本地运行

### 1. Django

```powershell
python -m venv .venv
.venv\Scripts\pip install -r requirements.txt
.venv\Scripts\python manage.py runserver 127.0.0.1:8000
```

### 2. Vue

```powershell
cd frontend
pnpm install
pnpm dev
```

打开 `http://127.0.0.1:5173`。Vite 会把 `/api` 请求代理到 Django。

站点导航、品牌和联系方式以 Django `/api/site-config/` 为唯一数据源。请求期间显示页面骨架；API 不可用时显示可重试错误页。

生产部署面向阿里云 Windows Server，采用 Nginx + Waitress，详见 [`docs/deployment.md`](docs/deployment.md)。

## 目录

- `frontend/src/components/`：可复用页面组件
- `frontend/src/config/hero.js`：Hero 轮播素材与展示信息
- `frontend/public/images/hero/`：首屏轮播使用的精选素材副本
- `site_content/`：站点配置 API
- `素材/`：原始图片、视频与设计资料
