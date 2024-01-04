import { Transaction } from "../models/Transaction";

export interface TransactionRepository {
    add(transaction: Transaction): Promise<void>
}
