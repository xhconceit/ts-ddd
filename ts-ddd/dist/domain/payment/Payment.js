import { DomainPaymentStatus } from './PaymentStatus.js';
export class PaymentAggregate {
    id;
    merchantOrderId;
    platform;
    amountCents;
    currency;
    status;
    platformTradeNo;
    description;
    notifyUrl;
    constructor(id, merchantOrderId, platform, amountCents, currency, status, platformTradeNo, description, notifyUrl) {
        this.id = id;
        this.merchantOrderId = merchantOrderId;
        this.platform = platform;
        this.amountCents = amountCents;
        this.currency = currency;
        this.status = status;
        this.platformTradeNo = platformTradeNo;
        this.description = description;
        this.notifyUrl = notifyUrl;
    }
    markPaid(platformTradeNo) {
        if (this.status !== DomainPaymentStatus.PENDING)
            throw new Error('只能在待支付状态标记为已支付');
        this.status = DomainPaymentStatus.PAID;
        this.platformTradeNo = platformTradeNo;
    }
    cancel() {
        if (this.status !== DomainPaymentStatus.PENDING)
            throw new Error('只能取消待支付订单');
        this.status = DomainPaymentStatus.CANCELED;
    }
    markRefunded() {
        if (this.status !== DomainPaymentStatus.PAID)
            throw new Error('只有已支付订单可退款');
        this.status = DomainPaymentStatus.REFUNDED;
    }
}
//# sourceMappingURL=Payment.js.map