import { FastifyReply, FastifyRequest } from 'fastify';
import { UserUseCases } from '../../core/domain/usecases/UserUseCases';
import { User } from '../../core/domain/entities/User';

export class UserController {
  constructor(private userUseCases: UserUseCases) {}

  async createUser(req: FastifyRequest, reply: FastifyReply): Promise<void> {
    const { id, email, name, passwordHash, createdAt } = req.body as any;
    const user = new User(id, email, name, passwordHash, new Date(createdAt));
    const createdUser = await this.userUseCases.createUser(user);
    reply.status(201).send(createdUser);
  }

  async getUserById(req: FastifyRequest, reply: FastifyReply): Promise<void> {
    const { id } = req.params as any;
    const user = await this.userUseCases.getUserById(id);
    if (user) {
      reply.status(200).send(user);
    } else {
      reply.status(404).send({ message: 'User not found' });
    }
  }

  async getAllUsers(req: FastifyRequest, reply: FastifyReply): Promise<void> {
    const users = await this.userUseCases.getAllUsers();
    reply.status(200).send(users);
  }

  async updateUser(req: FastifyRequest, reply: FastifyReply): Promise<void> {
    const { id, email, name, passwordHash } = req.body as any;
    const user = new User(id, email, name, passwordHash, new Date());
    const updatedUser = await this.userUseCases.updateUser(user);
    reply.status(200).send(updatedUser);
  }

  async deleteUser(req: FastifyRequest, reply: FastifyReply): Promise<void> {
    const { id } = req.params as any;
    await this.userUseCases.deleteUser(id);
    reply.status(204).send();
  }
}
