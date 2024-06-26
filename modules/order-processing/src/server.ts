import fastify from "fastify";
import { env } from "./env";
import { prisma } from "./data/datasources/prismaClient";
import { userRoutes } from "./http/routes/userRoutes";
import { productRoutes } from "./http/routes/productRoutes";
import { cartRoutes } from "./http/routes/cartRoutes";

const app = fastify()

userRoutes(app)
productRoutes(app)
cartRoutes(app)

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