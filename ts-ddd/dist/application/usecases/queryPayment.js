export class QueryPaymentUseCase {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async execute(input) {
        const payment = input.id ? await this.repo.findById(input.id) : input.merchantOrderId ? await this.repo.findByMerchantOrderId(input.merchantOrderId) : null;
        if (!payment)
            throw Object.assign(new Error('支付单不存在'), { status: 404 });
        return payment;
    }
}
//# sourceMappingURL=queryPayment.js.map