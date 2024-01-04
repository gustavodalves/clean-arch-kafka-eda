import { Event } from "./event";

export class NewTransactionCreated extends Event {
    constructor(
        readonly value: number,
        readonly email: string
    ) {
        super()
    }
}
