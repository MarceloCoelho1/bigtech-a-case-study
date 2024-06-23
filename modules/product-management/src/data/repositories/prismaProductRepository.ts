import { IProductRepository } from "../../core/repositories/IProductRepository";
import { prisma } from "../datasources/prismaClient";
import { Product } from "../../core/entities/product";
import { CreateProductDTO } from "../../http/dtos/createProductDTO";
import { UpdateProductDTO } from "../../http/dtos/updateProductDTO";
import { BuyAProductDTO } from "../../http/dtos/buyAProductDTO";
import { UpdateStockLevel } from "../../http/dtos/updateStockLevelDTO";
import { SearchQueryDTO } from "../../http/dtos/searchQueryDTO";

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

    async deleteProduct(id: string): Promise<void> {
        await prisma.product.delete({ where: { id } })
    }

    async buyAProduct(data: BuyAProductDTO, newQuantityInStock: number): Promise<void> {
        await prisma.product.update({
            where: {
                id: data.productId
            },
            data: {
                quantity_in_stock: newQuantityInStock
            }
        })
    }

    async updateStockLevel(productId: string, newQuantityInStock: number): Promise<Product> {
        const product = await prisma.product.update({
            where: {
                id: productId
            },
            data: {
                quantity_in_stock: newQuantityInStock
            }
        })

        return product
    }

    async searchProducts(data: SearchQueryDTO): Promise<Product[] | null> {
        const products = await prisma.product.findMany({
            where: {
                name: {contains: data.name, mode: 'insensitive' },
                price: {
                    gte: data.priceMin,
                    lte: data.priceMax
                },
                category_id: data.categoryId

            }
        })

        return products
    }
}