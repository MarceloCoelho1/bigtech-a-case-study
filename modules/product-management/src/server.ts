import fastify from 'fastify'
import multipart from '@fastify/multipart'
import { env } from './env';
import { prisma } from './data/datasources/prismaClient';
import { productRoutes } from './http/routes/productRoutes';
import { categoryRoutes } from './http/routes/categoryRoutes';
import { reviewRoutes } from './http/routes/reviewRoutes';

const app = fastify();

app.register(multipart)
productRoutes(app)
categoryRoutes(app)
reviewRoutes(app)

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