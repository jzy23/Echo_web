# EchoSim 开发约定

- 项目使用 Django + Vue 3 + Vite：Django 负责 API，Vue 负责页面。
- 保持适合单人开发的简单架构和最少依赖，不擅自引入 Django REST Framework、Pinia、Vue Router、UI 框架或图标库。
- 图片和视频可以直接保存在仓库中；网页使用的图片应控制尺寸与体积，原始素材保留在 `素材/`。
- 开发在本机完成，阿里云 Windows Server 通过 GitHub 拉取代码，使用 Nginx + Waitress 部署。
- 修改后必须执行 Vue 生产构建、Django 测试与 system check，并运行视觉检查。
- 详细信息架构、内容与视觉设计以 `素材/网站策划与页面设计方案.md` 为准。
