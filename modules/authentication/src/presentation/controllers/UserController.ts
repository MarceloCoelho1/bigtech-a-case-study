import { FastifyReply, FastifyRequest } from 'fastify';
import { UserUseCases } from '../../core/domain/usecases/UserUseCases';
import { UserAlreadyExistsError } from '../../core/domain/errors/UserAlreadyExists';
import { CreateUserDTO } from '../dtos/CreateUserDto';
import { UpdateUserDto } from '../dtos/UpdateUserDto';

export class UserController {
  constructor(private userUseCases: UserUseCases) {}

  async createUser(req: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const requestBody = req.body as CreateUserDTO
      const user = await this.userUseCases.createUser(requestBody);
      reply.status(201).send(user);
    } catch (error) {
      if (error instanceof UserAlreadyExistsError) {
        reply.status(error.statusCode).send({ error: error.message });
      } else {
        reply.status(500).send({ error: 'Internal Server Error' });
      }
    }
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
    const updateUserData = req.body as UpdateUserDto;
    const updatedUser = await this.userUseCases.updateUser(updateUserData);
    reply.status(200).send(updatedUser);
  }

  async deleteUser(req: FastifyRequest, reply: FastifyReply): Promise<void> {
    const { id } = req.params as any;
    await this.userUseCases.deleteUser(id);
    reply.status(204).send();
  }
}
