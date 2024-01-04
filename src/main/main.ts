import { KafkaFactory } from './factories/kafka';
import { EventFactory } from './factories/events';
import { faker } from '@faker-js/faker';
import { TransactionRepositoryFake, TransactionRepositoryMySQL } from '../infra/repository';
import { TransactionService } from '../application/services/transaction.service';

function generateRandomNumbers(): number {
    const numero = Math.random() * 100;
    const randomNumberWithFixedIn2 = parseFloat(numero.toFixed(2));
    
    return randomNumberWithFixedIn2;
}

const run = async () => {
    const kafka = await new KafkaFactory().generate()
    const domainEventManager = await new EventFactory(kafka).generate()
    await kafka.run()

    const transactionService = new TransactionService(
        domainEventManager, new TransactionRepositoryFake()
    )

    do {
        await transactionService.create(generateRandomNumbers(), faker.internet.email())
        await new Promise(resolve => setTimeout(resolve, 25));
    } while(true)
};

run();
