import { PaymentStatus } from '@prisma/client';
export class RefundPaymentUseCase {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async execute(input) {
        const payment = input.id ? await this.repo.findById(input.id) : input.merchantOrderId ? await this.repo.findByMerchantOrderId(input.merchantOrderId) : null;
        if (!payment)
            throw Object.assign(new Error('支付单不存在'), { status: 404 });
        if (payment.status !== PaymentStatus.PAID)
            throw Object.assign(new Error('仅已支付可退款'), { status: 400 });
        const updated = await this.repo.updateStatus(payment.id, PaymentStatus.REFUNDED, payment.platformTradeNo ?? undefined);
        return { id: updated.id, status: updated.status };
    }
}
//# sourceMappingURL=refundPayment.js.map