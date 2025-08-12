# 基于 DDD 的 TypeScript 支付系统（Koa + 微信/支付宝 + Docker + MQ）

本仓库按照 `issue.md` 的交付顺序实现：

- 01 DDD 基础与术语
- 02 领域边界与上下文映射
- 03 核心用例与状态机/时序图
- 04 分层架构与目录结构
- 05 领域模型与接口清单
- 06 适配器与集成策略
- 07 最小可运行骨架（本仓库提供）
- 08 文档与运行手册

## 快速开始

- 复制环境变量

```bash
cp .env.example .env
```

- 生成 Prisma Client

```bash
npm install
npm run prisma:generate
```

- 本地启动（Node）

```bash
npm run dev
```

- Docker 启动（包含 PostgreSQL + RabbitMQ）

```bash
docker compose up --build -d
```

- 健康检查

```bash
curl http://localhost:3000/health
```

## 目录结构（简要）

- src/
  - interfaces/http: Koa 控制器与路由
  - application: 用例层
  - domain: 领域模型
  - infrastructure: 仓储与外部适配器
  - middleware: Koa 中间件

详细设计见 `docs/`。