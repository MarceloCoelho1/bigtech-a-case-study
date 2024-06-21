import { CreateProductDTO } from "../../http/dtos/createProductDTO";
import { Product } from "../entities/product";
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
}