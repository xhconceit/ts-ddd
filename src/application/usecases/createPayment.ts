import { randomUUID } from 'node:crypto';
import { PaymentPlatform, PaymentStatus } from '@prisma/client';
import { PaymentRepository } from '../../infrastructure/repositories/PaymentRepository.js';

export interface CreatePaymentInput {
  merchantOrderId: string;
  platform: 'WECHAT' | 'ALIPAY';
  amountCents: number;
  currency?: string;
  description?: string;
  notifyUrl?: string;
}

export interface CreatePaymentOutput {
  id: string;
  merchantOrderId: string;
  paymentUrl: string; // 模拟收银台/二维码链接
}

export class CreatePaymentUseCase {
  constructor(private readonly repo: PaymentRepository) {}

  async execute(input: CreatePaymentInput): Promise<CreatePaymentOutput> {
    if (input.amountCents <= 0) throw Object.assign(new Error('金额必须大于0'), { status: 400 });
    const exists = await this.repo.findByMerchantOrderId(input.merchantOrderId);
    if (exists) return { id: exists.id, merchantOrderId: exists.merchantOrderId, paymentUrl: this.mockPayUrl(exists.platform, exists.merchantOrderId) };

    const id = randomUUID();
    const created = await this.repo.create({
      id,
      merchantOrderId: input.merchantOrderId,
      platform: input.platform as PaymentPlatform,
      amountCents: input.amountCents,
      currency: input.currency ?? 'CNY',
      status: PaymentStatus.PENDING,
      platformTradeNo: null,
      description: input.description ?? null,
      notifyUrl: input.notifyUrl ?? null,
      version: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as any);

    return { id: created.id, merchantOrderId: created.merchantOrderId, paymentUrl: this.mockPayUrl(created.platform, created.merchantOrderId) };
  }

  private mockPayUrl(platform: PaymentPlatform, merchantOrderId: string): string {
    const base = platform === 'WECHAT' ? 'https://pay.mock/wechat' : 'https://pay.mock/alipay';
    return `${base}?order=${encodeURIComponent(merchantOrderId)}`;
  }
}