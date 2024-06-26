import fastify from 'fastify';
import { userRouter } from './routes/UserRoutes';
import { authRouter } from './routes/AuthRoutes';
import { prisma } from '../data/datasources/PrismaClient';

const app = fastify();

userRouter(app);
authRouter(app);

const start = async () => {
  try {
    await app.listen({ port: 3333 });
    console.log('Server is running on port 3333');

    await prisma.$connect()
    console.log('db connected')
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
