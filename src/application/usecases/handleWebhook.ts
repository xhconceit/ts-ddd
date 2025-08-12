import { PaymentStatus } from '@prisma/client';
import { PaymentRepository } from '../../infrastructure/repositories/PaymentRepository.js';

export interface HandleWebhookInput { platform: 'WECHAT' | 'ALIPAY'; rawBody: string }
export interface HandleWebhookOutput { ok: boolean }

export class HandleWebhookUseCase {
  constructor(private readonly repo: PaymentRepository) {}

  async execute(input: HandleWebhookInput): Promise<HandleWebhookOutput> {
    // Demo：略过真实验签，只解析 mock 字段 merchantOrderId / tradeNo
    let merchantOrderId = '';
    let tradeNo = '';
    try {
      const parsed = JSON.parse(input.rawBody);
      merchantOrderId = parsed.merchantOrderId ?? '';
      tradeNo = parsed.tradeNo ?? '';
    } catch {
      // 支持 x-www-form-urlencoded 或其他简单形式
      const pairs = new URLSearchParams(input.rawBody);
      merchantOrderId = pairs.get('merchantOrderId') ?? '';
      tradeNo = pairs.get('tradeNo') ?? '';
    }
    if (!merchantOrderId) throw Object.assign(new Error('缺少 merchantOrderId'), { status: 400 });

    const payment = await this.repo.findByMerchantOrderId(merchantOrderId);
    if (!payment) throw Object.assign(new Error('支付单不存在'), { status: 404 });
    if (payment.status === PaymentStatus.PENDING) {
      await this.repo.updateStatus(payment.id, PaymentStatus.PAID, tradeNo || payment.platformTradeNo || undefined);
    }
    return { ok: true };
  }
}