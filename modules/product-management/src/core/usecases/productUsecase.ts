import { CreateProductDTO } from "../../http/dtos/createProductDTO";
import { UpdateProductDTO } from "../../http/dtos/updateProductDTO";
import { Product } from "../entities/product";
import { ProductNotFound } from "../errors/productNotFoundError";
import { IProductRepository } from "../repositories/IProductRepository";

export class ProductUsecases {
    constructor(
        private productRepository: IProductRepository
    ) {}

    async createProduct(data: CreateProductDTO): Promise<Product> {
        const product = await this.productRepository.create(data)
        return product
    }

    async getAllProducts(): Promise<Product[]> {
        const product = await this.productRepository.getAllProducts()
        return product
    }

    async findById(id: string): Promise<Product | null> {
        const product = await this.productRepository.findById(id)
        return product
    }

    async updateProduct(data: UpdateProductDTO): Promise<Product> {

        const product = await this.findById(data.id)

        if(!product) {
            throw new ProductNotFound()
        }

        const updatedProduct = await this.productRepository.updateProduct(data)
        return updatedProduct
    }

    async deleteProduct(id: string): Promise<void> {

        const product = await this.findById(id)

        if(!product) {
            throw new ProductNotFound()
        }

        await this.productRepository.deleteProduct(id)
    } 
}