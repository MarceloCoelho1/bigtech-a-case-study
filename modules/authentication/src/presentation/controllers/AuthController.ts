import { FastifyReply, FastifyRequest } from 'fastify';
import { AuthUseCases } from '../../core/domain/usecases/AuthUseCases';
import { ICredentials } from '../../core/domain/types/ICredentials';
import { UserNotExists } from '../../core/domain/errors/UserNotExists';
import { IncorrectPassword } from '../../core/domain/errors/IncorrectPassword';
import { EmailNotSent } from '../../core/domain/errors/EmailNotSent';
import { InvalidToken } from '../../core/domain/errors/InvalidToken';

export class AuthController {
    constructor(private authUseCases: AuthUseCases) { }

    async login(req: FastifyRequest, reply: FastifyReply): Promise<void> {
        try {
            const creditials = req.body as ICredentials
            const isUser = await this.authUseCases.login(creditials)
            reply.status(201).send(isUser);
        } catch (error) {
            if (error instanceof UserNotExists) {
                reply.status(error.statusCode).send({ error: error.message });
            } else if (error instanceof IncorrectPassword) {
                reply.status(error.statusCode).send({ error: error.message });
            } else {
                reply.status(500).send({ error: 'Internal Server Error' });
            }
        }
    }

    async forgotPassword(req: FastifyRequest, reply: FastifyReply): Promise<void> {
        try {
            const { email } = req.body as { email: string }
            await this.authUseCases.forgotPassword(email)
            reply.status(201).send({ msg: "Email sent" });
        } catch (error) {
            if (error instanceof UserNotExists) {
                reply.status(error.statusCode).send({ error: error.message });
            } else if (error instanceof EmailNotSent) {
                reply.status(error.statusCode).send({ error: error.message });
            } else {
                reply.status(500).send({ error: 'Internal Server Error' });
            }
        }
    }

    async resetPassword(req: FastifyRequest, reply: FastifyReply): Promise<void> {
        try {
            const { password } = req.body as { password: string }
            const { token }  = req.query as { token: string }
            let data = {
                password,
                token
            }
            await this.authUseCases.resetPassword(data)
            reply.status(200).send({msg: 'password changed successfully'})
        } catch (error) {
            if (error instanceof UserNotExists) {
                reply.status(error.statusCode).send({ error: error.message });
            } else if (error instanceof InvalidToken) {
                reply.status(error.statusCode).send({ error: error.message });
            } else {
                reply.status(500).send({ error: 'Internal Server Error' });
            }

        }
    }
}
