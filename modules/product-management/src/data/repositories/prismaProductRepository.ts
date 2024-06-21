import { IProductRepository } from "../../core/repositories/IProductRepository";
import { prisma } from "../datasources/prismaClient";
import { Product } from "../../core/entities/product";
import { CreateProductDTO } from "../../http/dtos/createProductDTO";

export class PrismaProductRepository implements IProductRepository {
    async create(data: CreateProductDTO): Promise<Product> {
        const product = await prisma.product.create({
            data
        })

        return product
    }

    async getAllProducts(): Promise<Product[]> {
        const products = await prisma.product.findMany()
        return products
    }
}