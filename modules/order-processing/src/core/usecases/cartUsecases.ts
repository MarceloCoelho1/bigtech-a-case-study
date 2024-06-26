import { CartProduct } from "../entities/cartProduct";
import { CartIsEmpty } from "../errors/cartIsEmptyError";
import { ExpiredToken } from "../errors/expiredTokenError";
import { InvalidToken } from "../errors/invalidTokenError";
import { UserNotExists } from "../errors/userNotExistsError";
import { ICartRepository } from "../repositories/ICartRepository";
import { IUserRepository } from "../repositories/IUserRepository";
import { IJwtService } from "../services/IJwtService";


export class CartUsecases {
    constructor(
        private jwtRepository: IJwtService,
        private userRepository: IUserRepository,
        private cartRepository: ICartRepository

    ) { }

    async getAllProductsInCart(token: string): Promise<CartProduct[]> {
      
        const payload = this.jwtRepository.verify(token)

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

       const products = await this.cartRepository.getAllProductsFromCart(user.cart.id)
       return products
    }

    async clearCart(token: string): Promise<void> {

        const payload = this.jwtRepository.verify(token)
   
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

        const products = await this.cartRepository.getAllProductsFromCart(user.cart.id)

        if(!products) {
            throw new CartIsEmpty()
        }

        await this.cartRepository.clearCart(user.cart.id)

    }


}