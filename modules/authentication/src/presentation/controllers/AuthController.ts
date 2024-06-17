import { FastifyReply, FastifyRequest } from 'fastify';
import { AuthUseCases } from '../../core/domain/usecases/AuthUseCases';
import { ICredentials } from '../../core/domain/types/ICredentials';
import { UserNotExists } from '../../core/domain/errors/UserNotExists';
import { IncorrectPassword } from '../../core/domain/errors/IncorrectPassword';

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
            } else if(error instanceof IncorrectPassword) {
                reply.status(error.statusCode).send({ error: error.message });
            } else {
                reply.status(500).send({ error: 'Internal Server Error' });
            }
        }
    }
}
