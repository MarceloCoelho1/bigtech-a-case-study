import fastify from 'fastify';
import { userRouter } from './routes/UserRoutes';
import { authRouter } from './routes/AuthRoutes';

const app = fastify();

userRouter(app);
authRouter(app);

const start = async () => {
  try {
    await app.listen({ port: 3333 });
    console.log('Server is running on port 3333');
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
