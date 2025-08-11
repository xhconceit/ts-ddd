import { env } from '../../config/env.js';
export class RabbitMQ {
    connection;
    channel;
    async connect() {
        const amqp = await import('amqplib');
        this.connection = await amqp.connect(env.rabbitmqUrl);
        this.channel = await this.connection.createChannel();
    }
    async publish(exchange, routingKey, message) {
        if (!this.channel)
            throw new Error('RabbitMQ channel not initialized');
        await this.channel.assertExchange(exchange, 'topic', { durable: true });
        this.channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(message)), { contentType: 'application/json' });
    }
    async close() {
        await this.channel?.close();
        await this.connection?.close();
    }
}
//# sourceMappingURL=rabbitmq.js.map