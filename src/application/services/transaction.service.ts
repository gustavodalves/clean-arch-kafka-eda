import { Transaction } from "../../domain/models/Transaction";
import { TransactionRepository } from "../../domain/repository/transaction";
import DomainEventManager from "../../domain/services/event-manager";

export class TransactionService {
    constructor(
        readonly eventManager: DomainEventManager,
        readonly repository: TransactionRepository
    ) {}

    async create(
        price: number,
        email: string
    ) {
        const transaction = Transaction.create(price, email)
        await this.repository.add(transaction)
        await this.eventManager.publish(transaction)
    }
}
