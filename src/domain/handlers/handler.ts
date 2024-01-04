import { Event } from "../events/event"

export interface EventHandler {
    event: string
    handle(event: Event): Promise<void>
}
