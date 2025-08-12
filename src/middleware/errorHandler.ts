import type { Middleware } from 'koa';

export const errorHandler: Middleware = async (ctx, next) => {
  try {
    await next();
  } catch (err: any) {
    const status = err.status || 500;
    const code = err.code || 'INTERNAL_ERROR';
    const message = status >= 500 ? '服务器错误' : err.message || '请求错误';
    ctx.status = status;
    ctx.body = { code, message };
    ctx.app.emit('error', err, ctx);
  }
};