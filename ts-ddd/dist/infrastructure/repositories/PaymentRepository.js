import { prisma } from '../prisma/client.js';
export class PaymentRepository {
    async create(data) {
        return prisma.payment.create({ data });
    }
    async findById(id) {
        return prisma.payment.findUnique({ where: { id } });
    }
    async findByMerchantOrderId(merchantOrderId) {
        return prisma.payment.findUnique({ where: { merchantOrderId } });
    }
    async updateStatus(id, status, platformTradeNo) {
        return prisma.payment.update({ where: { id }, data: { status, platformTradeNo: platformTradeNo ?? undefined } });
    }
}
//# sourceMappingURL=PaymentRepository.js.map