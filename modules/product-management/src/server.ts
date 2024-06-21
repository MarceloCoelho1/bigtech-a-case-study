import fastify from 'fastify'
import { env } from './env';
import { prisma } from './data/datasources/prismaClient';
import { productRoutes } from './http/routes/productRoutes';

const app = fastify();

productRoutes(app)


const start = async () => {
  try {
    await app.listen({ port: env.PORT });
    console.log(`🔥 Server is running on port ${env.PORT}`);

    await prisma.$connect()
    console.log("🔥 db connected")
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();