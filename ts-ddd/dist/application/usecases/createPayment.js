import { randomUUID } from 'node:crypto';
import { PaymentStatus } from '@prisma/client';
export class CreatePaymentUseCase {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async execute(input) {
        if (input.amountCents <= 0)
            throw Object.assign(new Error('金额必须大于0'), { status: 400 });
        const exists = await this.repo.findByMerchantOrderId(input.merchantOrderId);
        if (exists)
            return { id: exists.id, merchantOrderId: exists.merchantOrderId, paymentUrl: this.mockPayUrl(exists.platform, exists.merchantOrderId) };
        const id = randomUUID();
        const created = await this.repo.create({
            id,
            merchantOrderId: input.merchantOrderId,
            platform: input.platform,
            amountCents: input.amountCents,
            currency: input.currency ?? 'CNY',
            status: PaymentStatus.PENDING,
            platformTradeNo: null,
            description: input.description ?? null,
            notifyUrl: input.notifyUrl ?? null,
            version: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        return { id: created.id, merchantOrderId: created.merchantOrderId, paymentUrl: this.mockPayUrl(created.platform, created.merchantOrderId) };
    }
    mockPayUrl(platform, merchantOrderId) {
        const base = platform === 'WECHAT' ? 'https://pay.mock/wechat' : 'https://pay.mock/alipay';
        return `${base}?order=${encodeURIComponent(merchantOrderId)}`;
    }
}
//# sourceMappingURL=createPayment.js.map