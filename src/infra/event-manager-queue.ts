import DomainEventManager from "../domain/services/event-manager";
import { Queue } from "./queue";

import { EventHandler } from "../domain/handlers/handler";
import { Aggregate } from "../domain/models/aggregate";

export class EventManagerQueue implements DomainEventManager {
    constructor(
        private queue: Queue
    ) {}

    async publish(aggregate: Aggregate): Promise<void> {
        for (const event of aggregate.getEvents()) {
            await this.queue.pub(event.constructor.name, [event])   
        }
    }

    async register(handler: EventHandler): Promise<void> {
        await this.queue.sub(
            handler.event, handler
        )
    }
}
