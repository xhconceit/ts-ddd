import getRawBody from 'raw-body';
export const rawBody = async (ctx, next) => {
    if (ctx.request.is('application/json') || ctx.request.is('text/*') || ctx.request.is('application/*')) {
        ctx.req.setEncoding('utf8');
        const raw = await getRawBody(ctx.req);
        ctx.request.rawBody = raw.toString();
    }
    await next();
};
//# sourceMappingURL=rawBody.js.map