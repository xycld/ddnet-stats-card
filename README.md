# ddnet-stats-card
Generate ddnet profile stats cards / 生成你的 ddnet 统计卡片

![DDcard](https://ddcard.xy-cloud.xyz/svg?username=xy_cloud&team=TeeFun&skin=https://ddnet.org/skins/skin/community/AmethystCat.png)

url:https://ddcard.xy-cloud.xyz

这是我搭建的服务，随时可能因各种原因关闭，你可以在 https://status.xy-cloud.xyz/status/status 查看他的状态

`Sorry, I can't afford this server anymore, I'll be replacing it with a new one, but it will take a while`

This is a service I built that can be shut down at any time for various reasons, you can check his status at https://status.xy-cloud.xyz/status/status



## 安装 / Installation

您的 Flask 应用 (`index.py`) 通过 WSGI 服务器运行，而不是 Flask 内置的开发服务器。

### Docker 部署

```bash
docker-compose up -d
```
*   这种方式下，`Dockerfile` 配置了使用 **Gunicorn** 作为 WSGI 服务器来运行 `index.py` 中的 `app` 实例。
*   `gunicorn.conf` 文件定义了 Gunicorn 的配置。
*   `docker-compose.yml` 管理容器的构建和运行，并将主机的端口映射到容器内 Gunicorn 监听的端口。

### Vercel 部署

您也可以将此项目部署到 Vercel。

1.  **Fork 本仓库** 或将其克隆到您的本地计算机。
2.  **安装 Vercel CLI** (如果您还没有安装的话):
    ```bash
    npm install -g vercel
    ```
3.  **登录 Vercel CLI**:
    ```bash
    vercel login
    ```
4.  **部署项目**:
    在项目根目录运行以下命令：
    ```bash
    vercel
    ```
    或者，您可以将您的 Git 仓库连接到 Vercel 平台，以实现自动部署。

    Vercel 将自动检测 `vercel.json` 文件并根据其配置进行部署。
*   Vercel 的 Python 运行时会自动查找并运行 `index.py` 文件中的 `app` Flask 实例，无需您手动配置 WSGI 服务器。
