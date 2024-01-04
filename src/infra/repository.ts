import { Transaction } from "../domain/models/Transaction";
import { TransactionRepository } from "../domain/repository/transaction";


import mysql2 from "mysql2"

type Options = {
    host: string,
    port: number,
    password: string,
    user: string,
    database: string
}

export class MySQL2Connector {
    readonly  _pool: mysql2.Pool

    constructor(
        readonly options: Options
    ) {
        this._pool = this.connect(options)
    }

    connect({
        database, host, password, port, user
    }: Options) {
        return mysql2.createPool({
            database, host, password, port, user
        })
    }

    getPool() {
        return this._pool
    }
}

export class MySQL2ConnectionAdapter {
    constructor(
        public pool: mysql2.Pool
    ) {}

    async query<T>(
        consult: string,
        data?: any[]
    ): Promise<T> {
        return new Promise((resolve, reject) => {
            this.pool.query(
                consult,
                data,
                (err, result) => {
                    if(err) reject(err)
                    resolve(result as any)
                }
            )
        })
    }
}

export class TransactionRepositoryMySQL implements TransactionRepository {
    private readonly adapter = new MySQL2ConnectionAdapter(
        new MySQL2Connector({
            database: 'test',
            host: 'localhost',
            password: 'admin',
            user: 'root',
            port: 3308,
        })._pool
    )

    async add(transaction: Transaction): Promise<void> {
        await this.adapter.query(`insert into transactions (price, email) values (${transaction.value}, "${transaction.email}")`)
    }
}


export class TransactionRepositoryFake implements TransactionRepository {
    private readonly data: Transaction[] = []

    async add(transaction: Transaction): Promise<void> {
        this.data.push(transaction)
    }
}