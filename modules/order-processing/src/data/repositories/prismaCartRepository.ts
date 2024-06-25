import { ICartRepository } from "../../core/repositories/ICartRepository";
import { CreateCartDTO } from "../../http/dtos/createCartDTO";
import { prisma } from "../datasources/prismaClient";

export class PrismaCartRepository implements ICartRepository {

    async create(data: CreateCartDTO): Promise<void> {
        await prisma.cart.create({
            data,
            include: {
                products: true
            }
        })
    }


}