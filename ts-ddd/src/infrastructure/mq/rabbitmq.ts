import { env } from '../../config/env.js';

export class RabbitMQ {
  private connection: any;
  private channel: any;

  async connect(): Promise<void> {
    const amqp = await import('amqplib');
    this.connection = await amqp.connect(env.rabbitmqUrl as any);
    this.channel = await this.connection.createChannel();
  }

  async publish(exchange: string, routingKey: string, message: unknown): Promise<void> {
    if (!this.channel) throw new Error('RabbitMQ channel not initialized');
    await this.channel.assertExchange(exchange, 'topic', { durable: true });
    this.channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(message)), { contentType: 'application/json' });
  }

  async close(): Promise<void> {
    await this.channel?.close();
    await this.connection?.close();
  }
}