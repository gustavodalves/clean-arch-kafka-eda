import { TransactionHandler } from "../../application/handler/transaction-handler"
import { EventManagerQueue } from "../../infra/event-manager-queue"
import { MailSenderFake } from "../../infra/mail-sender"
import { Queue } from "../../infra/queue"

export class EventFactory {
    constructor(
        readonly queue: Queue
    ) {}

    async generate() {
        const domainEventManagerQueue = new EventManagerQueue(this.queue)
        await domainEventManagerQueue.register(new TransactionHandler(
            new MailSenderFake()
        ))

        return domainEventManagerQueue
    }
}
