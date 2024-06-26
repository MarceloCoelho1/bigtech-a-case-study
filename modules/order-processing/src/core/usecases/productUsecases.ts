import { AddProductToCart } from "../../http/dtos/addProductToCartDTO";
import { CreateProductDTO } from "../../http/dtos/createProductDTO";
import { RemoveItemFromCart } from "../../http/dtos/removeItemFromCartDTO";
import { UpdateProductQuantityInTheCart } from "../../http/dtos/updateProductQuantityDTO";
import { ProductIsNotInTheCart } from "../errors/ProductIsNotInTheCartError";
import { InvalidToken } from "../errors/invalidTokenError";
import { ProductIsAlreadyInTheCart } from "../errors/productIsAlreadyInTheCartError";
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

    async removeProductFromCart(data: RemoveItemFromCart): Promise<void> {
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

        const IsProductInCart = await this.cartProductRepository.findProductAtCartById(product.id, user.cart.id)

        if(!IsProductInCart) {
            throw new ProductIsNotInTheCart()
        }

        await this.cartProductRepository.RemoveItemFromCart(data.productId, user.cart.id)
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

        const IsProductInCart = await this.cartProductRepository.findProductAtCartById(product.id, user.cart.id)

        if(IsProductInCart) {
            throw new ProductIsAlreadyInTheCart()
        }

        await this.cartProductRepository.AddProductToCart(data, user.cart.id)
    }

    async updateProductQuantityInTheCart(data: UpdateProductQuantityInTheCart): Promise<void> {
        const payload = this.jwtRepository.verify(data.token)

        if(!payload) {
            throw new InvalidToken()
        }

        const userId = payload.userId

        const user = await this.userRepository.findById(userId)

        if(!user) {
            throw new UserNotExists()
        }

        if(!user.cart) {
            throw new Error('Internal server Error')
        }

        const productInTheCart = await this.cartProductRepository.findProductAtCartById(data.productId, user.cart.id)

        if(!productInTheCart) {
            throw new ProductIsNotInTheCart()
        }

        await this.cartProductRepository.updateProductQuantity(data.productId, data.quantity, user.cart.id)
    }
}