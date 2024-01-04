import { NewTransactionCreated } from "../../domain/events/new-transaction"
import { EventHandler } from "../../domain/handlers/handler"
import { MailSender } from "../gateways/mail-sender"

export class TransactionHandler implements EventHandler {
    event: string = NewTransactionCreated.prototype.constructor.name

    constructor(
        private mailSender: MailSender
    ) {}

    async handle(event: NewTransactionCreated): Promise<void> {
        console.log(event)
        await this.mailSender.send(event.email, `transaction value: ${event.value}`)
    }
}