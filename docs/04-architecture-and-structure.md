# 04 分层架构与目录结构（Koa 落地）

- 接口层（interfaces/http）：
  - Koa 中间件顺序：请求ID → 日志 → 错误处理 → 安全/限流 → 解析器 → 鉴权 → 幂等键 → 路由。
  - Webhook 独立路由，保留原始报文用于签名校验。
- 应用层（application）：
  - 编排用例（createPayment/handleWebhook/refundPayment/queryPayment）。
  - 事务与一致性：与仓储协调 + Outbox 记录。
- 领域层（domain）：
  - 纯模型（实体/值对象/聚合/领域事件）。
- 基础设施层（infrastructure）：
  - Prisma 仓储、RabbitMQ、外部平台适配器（微信/支付宝）。

目录建议
- `src/interfaces/http/*`
- `src/application/usecases/*`
- `src/domain/*`
- `src/infrastructure/*`
- `src/middleware/*`