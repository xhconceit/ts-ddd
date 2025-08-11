import dotenv from 'dotenv';
dotenv.config();
export const env = {
    nodeEnv: process.env.NODE_ENV ?? 'development',
    port: Number(process.env.PORT ?? 3000),
    logLevel: process.env.LOG_LEVEL ?? 'info',
    databaseUrl: process.env.DATABASE_URL ?? 'postgresql://postgres:postgres@localhost:5432/payments?schema=public',
    rabbitmqUrl: process.env.RABBITMQ_URL ?? 'amqp://localhost:5672',
};
//# sourceMappingURL=env.js.map