import pino from 'pino';
import type { Middleware } from 'koa';
import { env } from '../config/env.js';

export const logger = pino({ level: env.logLevel, transport: env.nodeEnv === 'development' ? { target: 'pino-pretty' } : undefined });

export const loggingMiddleware: Middleware = async (ctx, next) => {
  const start = Date.now();
  const requestId = ctx.state.requestId as string | undefined;
  try {
    await next();
    const ms = Date.now() - start;
    logger.info({ requestId, method: ctx.method, path: ctx.path, status: ctx.status, ms }, 'request');
  } catch (err: any) {
    const ms = Date.now() - start;
    logger.error({ requestId, err, method: ctx.method, path: ctx.path, status: ctx.status, ms }, 'request_error');
    throw err;
  }
};