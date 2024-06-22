import { IProductRepository } from "../../core/repositories/IProductRepository";
import { prisma } from "../datasources/prismaClient";
import { Product } from "../../core/entities/product";
import { CreateProductDTO } from "../../http/dtos/createProductDTO";
import { UpdateProductDTO } from "../../http/dtos/updateProductDTO";

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

    async updateProduct(data: UpdateProductDTO): Promise<Product> {
        const updatedProduct = await prisma.product.update({
            where: {
                id: data.id
            },
            data
        })

        return updatedProduct
    }


    async findById(id: string): Promise<Product | null> {
        const product = await prisma.product.findUnique({ where: { id } })
        return product
    }
}