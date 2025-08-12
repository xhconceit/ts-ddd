import { DomainPaymentStatus } from './PaymentStatus.js';

export class PaymentAggregate {
  constructor(
    public readonly id: string,
    public merchantOrderId: string,
    public platform: 'WECHAT' | 'ALIPAY',
    public amountCents: number,
    public currency: string,
    public status: DomainPaymentStatus,
    public platformTradeNo?: string | null,
    public description?: string | null,
    public notifyUrl?: string | null,
  ) {}

  markPaid(platformTradeNo: string) {
    if (this.status !== DomainPaymentStatus.PENDING) throw new Error('只能在待支付状态标记为已支付');
    this.status = DomainPaymentStatus.PAID;
    this.platformTradeNo = platformTradeNo;
  }

  cancel() {
    if (this.status !== DomainPaymentStatus.PENDING) throw new Error('只能取消待支付订单');
    this.status = DomainPaymentStatus.CANCELED;
  }

  markRefunded() {
    if (this.status !== DomainPaymentStatus.PAID) throw new Error('只有已支付订单可退款');
    this.status = DomainPaymentStatus.REFUNDED;
  }
}