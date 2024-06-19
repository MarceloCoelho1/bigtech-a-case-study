export interface IMailService {
    sendMail(data: { to: string; subject: string; body: string }): Promise<void>;
}