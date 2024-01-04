import { MailSender } from "../application/gateways/mail-sender";

export class MailSenderFake implements MailSender {
    async send(mail: string, body: string): Promise<void> {
        console.log(`destination: ${mail}`)
        console.log(body)
    }
}