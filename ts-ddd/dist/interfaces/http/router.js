import Koa from 'koa';
import Router from '@koa/router';
import helmet from 'koa-helmet';
import bodyParser from 'koa-bodyparser';
import { requestId } from '../../middleware/requestId.js';
import { loggingMiddleware } from '../../middleware/logger.js';
import { errorHandler } from '../../middleware/errorHandler.js';
import { rawBody } from '../../middleware/rawBody.js';
import { createPayment, refundPayment, queryPayment, webhookWechat, webhookAlipay } from './controllers/paymentController.js';
export function buildApp() {
    const app = new Koa();
    const router = new Router({ prefix: '/api' });
    // 中间件顺序
    app.use(requestId);
    app.use(loggingMiddleware);
    app.use(errorHandler);
    app.use(helmet());
    // 一般路由：JSON 解析
    app.use(bodyParser());
    router.get('/health', async (ctx) => { ctx.body = { ok: true }; });
    router.post('/payments', createPayment);
    router.post('/payments/refund', refundPayment);
    router.get('/payments', queryPayment);
    app.use(router.routes());
    app.use(router.allowedMethods());
    // Webhook 路由需保留原始报文
    const webhook = new Router({ prefix: '/webhooks' });
    webhook.post('/wechat', rawBody, webhookWechat);
    webhook.post('/alipay', rawBody, webhookAlipay);
    app.use(webhook.routes());
    app.use(webhook.allowedMethods());
    // 统一错误事件日志
    app.on('error', (err, ctx) => {
        // no-op; 已在 loggingMiddleware 记录
    });
    return app;
}
//# sourceMappingURL=router.js.map