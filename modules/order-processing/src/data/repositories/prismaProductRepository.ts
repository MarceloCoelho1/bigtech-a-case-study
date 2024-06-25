import { Product } from "../../core/entities/product";
import { IProductRepository } from "../../core/repositories/IProductRepository";
import { CreateProductDTO } from "../../http/dtos/createProductDTO";
import { prisma } from "../datasources/prismaClient";

export class PrismaProductRepository implements IProductRepository {

    async create(data: CreateProductDTO): Promise<Product> {
        const product = await prisma.product.create({
            data,
            include: {
                carts: true
            }
        })
        return product
    }

    async getAllProducts(): Promise<Product[]> {
        const products = await prisma.product.findMany({
            include: {
                carts: true
            }
        })
        return products
    }
}