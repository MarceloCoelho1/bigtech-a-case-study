import { Product } from "../../core/entities/product";
import { IProductRepository } from "../../core/repositories/IProductRepository";
import { ProductWithoutCarts } from "../../core/types/productWithoutCarts";
import { CreateProductDTO } from "../../http/dtos/createProductDTO";
import { prisma } from "../datasources/prismaClient";

export class PrismaProductRepository implements IProductRepository {

    async create(data: CreateProductDTO): Promise<ProductWithoutCarts> {
        const product = await prisma.product.create({
            data
        })
        return product
    }

    async getAllProducts(): Promise<ProductWithoutCarts[]> {
        const products = await prisma.product.findMany()
        return products
    }

    async findById(id: string): Promise<ProductWithoutCarts | null> {
        const product = await prisma.product.findUnique({
            where: {id}
        })

        return product
    }
}