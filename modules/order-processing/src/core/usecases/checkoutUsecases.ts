import { InitCheckoutDTO } from "../../http/dtos/initCheckoutDTO";
import { CartIsEmpty } from "../errors/cartIsEmptyError";
import { InvalidDiscountCode } from "../errors/invalidDiscountCodeError";
import { InvalidToken } from "../errors/invalidTokenError";
import { UserNotExists } from "../errors/userNotExistsError";
import { ICartRepository } from "../repositories/ICartRepository";
import { IUserRepository } from "../repositories/IUserRepository";
import { IJwtService } from "../services/IJwtService";
import { IMailService } from "../services/IMailService";


export class CheckoutUsecases {
    constructor(
        private jwtRepository: IJwtService,
        private userRepository: IUserRepository,
        private cartRepository: ICartRepository,
        private mailService: IMailService
    ) { }

    async initCheckout(data: InitCheckoutDTO) {
        const payload =  this.jwtRepository.verify(data.token)

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

        let discountCode: {
            name: string;
            discount: number;
        } | undefined

        const discountCodes = [{
            name: "firstBuy",
            discount: 10
        }]

        if(data.discountCode) {
            discountCode = discountCodes.find(code => code.name === data.discountCode);

            if(!discountCode) {
                throw new InvalidDiscountCode()
            }
        }

        let sum = 0
        for (let i = 0; i < products.length; i++) {
            sum += products[i].unit_price * products[i].quantity_of_products 
        }

        if(discountCode) {
            sum = sum - (sum * (discountCode.discount/100))
        } 
        let totalInCents = Math.round(sum * 100);
        const orderDetails = {
            name: user.name,
            email: user.email,
            total_price: totalInCents
        }

        let mailData = {
            to: user.email,
            subject: "Order Created",
            body: `<p><strong>Order Created</strong>!</p>`
        }

        await this.mailService.sendMail(mailData)

        return orderDetails

    }
    


}