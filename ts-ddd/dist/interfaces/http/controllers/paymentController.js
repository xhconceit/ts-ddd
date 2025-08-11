import { z } from 'zod';
import { PaymentRepository } from '../../../infrastructure/repositories/PaymentRepository.js';
import { CreatePaymentUseCase } from '../../../application/usecases/createPayment.js';
import { RefundPaymentUseCase } from '../../../application/usecases/refundPayment.js';
import { QueryPaymentUseCase } from '../../../application/usecases/queryPayment.js';
import { HandleWebhookUseCase } from '../../../application/usecases/handleWebhook.js';
const repo = new PaymentRepository();
export const createPayment = async (ctx) => {
    const schema = z.object({
        merchantOrderId: z.string().min(1),
        platform: z.enum(['WECHAT', 'ALIPAY']),
        amountCents: z.number().int().positive(),
        currency: z.string().default('CNY'),
        description: z.string().optional(),
        notifyUrl: z.string().url().optional(),
    });
    const input = schema.parse(ctx.request.body);
    const usecase = new CreatePaymentUseCase(repo);
    const result = await usecase.execute(input);
    ctx.status = 201;
    ctx.body = result;
};
export const refundPayment = async (ctx) => {
    const schema = z.object({ id: z.string().uuid().optional(), merchantOrderId: z.string().optional() }).refine(v => v.id || v.merchantOrderId, { message: 'id 或 merchantOrderId 必填其一' });
    const input = schema.parse(ctx.request.body);
    const usecase = new RefundPaymentUseCase(repo);
    const result = await usecase.execute(input);
    ctx.body = result;
};
export const queryPayment = async (ctx) => {
    const schema = z.object({ id: z.string().uuid().optional(), merchantOrderId: z.string().optional() }).refine(v => v.id || v.merchantOrderId, { message: 'id 或 merchantOrderId 必填其一' });
    const input = schema.parse(ctx.request.query);
    const usecase = new QueryPaymentUseCase(repo);
    const result = await usecase.execute(input);
    ctx.body = result;
};
export const webhookWechat = async (ctx) => {
    const rawBody = ctx.request.rawBody;
    const usecase = new HandleWebhookUseCase(repo);
    const result = await usecase.execute({ platform: 'WECHAT', rawBody });
    ctx.body = result;
};
export const webhookAlipay = async (ctx) => {
    const rawBody = ctx.request.rawBody;
    const usecase = new HandleWebhookUseCase(repo);
    const result = await usecase.execute({ platform: 'ALIPAY', rawBody });
    ctx.body = result;
};
//# sourceMappingURL=paymentController.js.map