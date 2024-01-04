import { Consumer, Kafka, Partitioners, Producer } from 'kafkajs';
import { Queue } from "./queue";
import { EventHandler } from '../domain/handlers/handler';
import { Event } from '../domain/events/event';

export class KafkaAdapter implements Queue {
    private handlers: Record<string, EventHandler> = {}

    private constructor(
        private producer: Producer,
        private consumer: Consumer,
    ) {}

    static async create(
        brokers: string[],
        groupId: string
    ) {
        const kafka = new Kafka({
            brokers: brokers
        });

        const producer = kafka.producer({ createPartitioner: Partitioners.LegacyPartitioner });
        const consumer = kafka.consumer({ groupId });

        await producer.connect()
        await consumer.connect()

        const adapter = new KafkaAdapter(
            producer,
            consumer,
        )

        return adapter
    }

    async pub(topic: string, messages: Event[]): Promise<void> {
        await this.producer.send({
            topic,
            messages: messages.map(message => ({ value: JSON.stringify(message) })),
        });
    }

    async sub(topic: string, handler: EventHandler): Promise<void> {
        this.handlers[topic] = handler

        await this.consumer.subscribe({
            topic, 
        })
    }

    async run() {
        await this.consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                const handler = this.handlers[topic]
                if(!handler) throw new Error()
                await handler.handle(
                    JSON.parse(message.value!.toString())
                )
            },
        })
    }
}
