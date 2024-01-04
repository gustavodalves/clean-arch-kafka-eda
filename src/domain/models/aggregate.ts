import { Event } from "../events/event"

export abstract class Aggregate {
    private readonly events: Event[] = []
    
    addEvent(event: Event) {
        this.events.push(event)
    }

    getEvents() {
        return this.events
    }
}