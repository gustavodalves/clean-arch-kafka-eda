import { Event } from "../events/event";
import { NewTransactionCreated } from "../events/new-transaction";
import { Aggregate } from "./aggregate";

export class Transaction extends Aggregate {
    constructor(
        readonly value: number,
        readonly email: string
    ) {
        super()
    }

    static create(value: number, email: string) {
        const transaction = new Transaction(value, email)

        transaction.addEvent(
            new NewTransactionCreated(transaction.value, transaction.email)
        )

        return transaction
    }
}
