export interface MailSender {
    send(mail: string, body: string): Promise<void>
}
