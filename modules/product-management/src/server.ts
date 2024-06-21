import fastify from 'fastify'
import { env } from './env';
import { prisma } from './data/datasources/prismaClient';

const app = fastify();

app.get('/', async (request, reply) => {
    reply.status(200).send({msg: "Hello World!"})
})


const start = async () => {
  try {
    await app.listen({ port: env.PORT });
    console.log(`🔥 Server is running on port ${env.PORT}`);

    prisma.$connect()
    console.log("🔥 db connected")
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();