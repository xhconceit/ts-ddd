# 05 领域模型与接口清单

聚合根 `Payment`
- 字段：id, merchantOrderId, platform, amountCents, currency, status, platformTradeNo, description, notifyUrl, version, createdAt, updatedAt
- 不变式：金额>0，状态迁移合法，平台与订单号一一对应
- 行为：markPaid, cancel, refundRequested, markRefunded

接口清单（应用层）
- `CreatePaymentUseCase`：输入（订单号、平台、金额、描述、回调地址），输出（支付链接/二维码、内部id）
- `HandleWebhookUseCase`：输入（平台、原始报文），输出（处理结果）
- `RefundPaymentUseCase`：输入（订单号或内部id、金额<=原额），输出（受理结果）
- `QueryPaymentUseCase`：输入（订单号或交易号），输出（状态/金额）

仓储接口
- `PaymentRepository`: save, findById, findByMerchantOrderId, updateStatus