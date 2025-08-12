import { prisma } from '../prisma/client.js';
import { PaymentStatus, type Payment } from '@prisma/client';

export class PaymentRepository {
  async create(data: Omit<Payment, 'createdAt' | 'updatedAt'>): Promise<Payment> {
    return prisma.payment.create({ data });
  }

  async findById(id: string): Promise<Payment | null> {
    return prisma.payment.findUnique({ where: { id } });
  }

  async findByMerchantOrderId(merchantOrderId: string): Promise<Payment | null> {
    return prisma.payment.findUnique({ where: { merchantOrderId } });
  }

  async updateStatus(id: string, status: PaymentStatus, platformTradeNo?: string | null): Promise<Payment> {
    return prisma.payment.update({ where: { id }, data: { status, platformTradeNo: platformTradeNo ?? undefined } });
  }
}