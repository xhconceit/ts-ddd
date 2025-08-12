import { Payment } from '@prisma/client';
import { PaymentRepository } from '../../infrastructure/repositories/PaymentRepository.js';

export interface QueryPaymentInput { id?: string; merchantOrderId?: string }

export class QueryPaymentUseCase {
  constructor(private readonly repo: PaymentRepository) {}

  async execute(input: QueryPaymentInput): Promise<Payment> {
    const payment = input.id ? await this.repo.findById(input.id) : input.merchantOrderId ? await this.repo.findByMerchantOrderId(input.merchantOrderId) : null;
    if (!payment) throw Object.assign(new Error('支付单不存在'), { status: 404 });
    return payment;
  }
}