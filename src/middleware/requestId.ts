import { v4 as uuidv4 } from 'uuid';
import type { Middleware } from 'koa';

export const requestId: Middleware = async (ctx, next) => {
  const headerKey = 'x-request-id';
  const incoming = ctx.get(headerKey);
  const id = incoming || uuidv4();
  ctx.state.requestId = id;
  ctx.set(headerKey, id);
  await next();
};