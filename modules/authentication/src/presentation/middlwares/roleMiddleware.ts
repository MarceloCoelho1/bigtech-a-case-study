import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify';
import { JWTService } from '../../infra/adapters/JWTService'; 
import { PrismaUserRepository } from '../../data/repositories/PrismaUserRepository'; 
import { env } from '../../shared/env'; 

const jwtService = new JWTService({ secret: env.JWT_SECRET, expiresIn: env.JWT_EXPIRES_IN });
const userRepository = new PrismaUserRepository();

export const roleMiddleware = async (req: FastifyRequest, reply: FastifyReply) => {
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    return reply.status(401).send({ message: 'Unauthorized: Token not provided' });
  }

  try {
    const decodedToken = jwtService.verify(token);

    if(!decodedToken) {
      return reply.status(404).send({ message: 'Unauthorized' });
    }

    const userId = decodedToken.userId;

    const user = await userRepository.findById(userId);

    if (!user) {
      return reply.status(404).send({ message: 'User not found' });
    }

    const userRole = user.role; 

    if (!userRole) {
      return reply.status(401).send({ message: 'Unauthorized: User role not defined' });
    }

    if (userRole === 'admin') {
      console.log('Access granted to admin');
    } else {
      console.log('Access denied');
      reply.status(403).send({ message: 'Forbidden: You do not have permission to access this resource' });
    }
  } catch (error) {
    console.error('Error verifying token:', error);
    reply.status(401).send({ message: 'Unauthorized: Invalid token' });
  }
};
