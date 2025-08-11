# 08 运行手册（Runbook）

- 启动顺序：PostgreSQL → RabbitMQ → App。
- 健康检查：`GET /health` 返回 200。
- 环境变量：见 `.env.example`。
- 数据库迁移：`npm run prisma:migrate`（本地/测试）。
- 回调联调：提供 `/webhooks/wechat`、`/webhooks/alipay`；需按平台规则签名与验签。
- 日志：pino（结构化），包含 requestId 与 traceId。
- 指标：预留（成功率/失败率/耗时/重试次数），可接入 Prometheus 网关。