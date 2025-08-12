# 01 DDD 基础教学与术语表（中文）

- 实体 Entity：具有连续性与标识（ID）的业务对象，如 `Payment`。
- 值对象 Value Object：仅由值定义，无唯一标识，如 `Money`、`Currency`。
- 聚合 Aggregation：一致性边界内的一组实体与值对象，`Payment` 作为聚合根。
- 领域服务 Domain Service：不天然归属某个实体的领域逻辑，如对账匹配算法。
- 领域事件 Domain Event：领域内发生的事实，如 `PaymentPaid`。
- 限界上下文 Bounded Context：统一语言适用的边界，如：支付、回调、对账。
- 统一语言 Ubiquitous Language：跨团队一致的业务语言，如“商户订单号”“平台交易号”。
- 分层架构：接口层（Koa）/应用层（用例）/领域层（模型）/基础设施层（仓储/外部）。
- 一致性：最终一致性（Outbox/Saga），以“可观察”的补偿与重试实现。
- 幂等：入口 `Idempotency-Key`、回调去重、出站 Outbox 去重。