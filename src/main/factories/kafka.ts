import { KafkaAdapter } from "../../infra/kafka"

export const kafkaConfig = async () => {
    const kafka = await KafkaAdapter.create(
        ['localhost:9092'],
        'my-group'
    )
}

export class KafkaFactory {
    async generate() {
        const kafka = await KafkaAdapter.create(
            ['localhost:9092'],
            'my-group'
        )

        return kafka
    }
}