import { CreateProductDTO } from "../../http/dtos/createProductDTO";
import { Product } from "../entities/product";
import { IProductRepository } from "../repositories/IProductRepository";
import { IJwtService } from "../services/IJwtService";


export class ProductUsecases {
    constructor(
        private productRepository: IProductRepository,
        private jwtRepository: IJwtService
    ) { }

    async create(data: CreateProductDTO): Promise<Product> {
        const product = await this.productRepository.create(data)
        return product
    }

    async getAllProducts(): Promise<Product[]> {
        const products = await this.productRepository.getAllProducts()
        return products
    }
}