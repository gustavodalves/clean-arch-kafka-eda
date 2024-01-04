import { EventHandler } from "../domain/handlers/handler"
import { Event } from "../domain/events/event"

export interface Queue {
    pub(queueName: string, messages: Event[]): Promise<void>
    sub(queueName: string, handler: EventHandler): Promise<void>
}
