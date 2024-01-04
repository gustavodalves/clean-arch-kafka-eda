import { Event } from "../events/event"
import { EventHandler } from "../handlers/handler"
import { Aggregate } from "../models/aggregate"

export default interface DomainEventManager {
    register(handler: EventHandler): Promise<void>
    publish(aggregate: Aggregate): Promise<void>
};
