import { AddProductToCart } from "../../http/dtos/addProductToCartDTO";
import { CreateProductDTO } from "../../http/dtos/createProductDTO";
import { InvalidToken } from "../errors/invalidTokenError";
import { ProductNotFound } from "../errors/productNotFoundError";
import { UserNotExists } from "../errors/userNotExistsError";
import { ICartProductRepository } from "../repositories/ICartProductRepository";
import { IProductRepository } from "../repositories/IProductRepository";
import { IUserRepository } from "../repositories/IUserRepository";
import { IJwtService } from "../services/IJwtService";
import { ProductWithoutCarts } from "../types/productWithoutCarts";


export class ProductUsecases {
    constructor(
        private productRepository: IProductRepository,
        private jwtRepository: IJwtService,
        private userRepository: IUserRepository,
        private cartProductRepository: ICartProductRepository
    ) { }

    async create(data: CreateProductDTO): Promise<ProductWithoutCarts> {
        const product = await this.productRepository.create(data)
        return product
    }

    async getAllProducts(): Promise<ProductWithoutCarts[]> {
        const products = await this.productRepository.getAllProducts()
        return products
    }

    async addProductToCart(data: AddProductToCart): Promise<void> {
        const payload = this.jwtRepository.verify(data.token)

        if(!payload) {
            throw new InvalidToken()
        }

        const userId = payload.userId

        const user = await this.userRepository.findById(userId)

        if(!user) {
            throw new UserNotExists()
        }
        const product = await this.productRepository.findById(data.productId)

        if(!product) {
            throw new ProductNotFound()
        }

        if(!user.cart) {
            throw new Error('Internal server Error')
        }

        await this.cartProductRepository.AddProductToCart(data, user.cart?.id)
    }
}