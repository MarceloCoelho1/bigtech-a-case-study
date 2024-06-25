import { ICartProductRepository } from "../../core/repositories/ICartProductRepository";
import { AddProductToCart } from "../../http/dtos/addProductToCartDTO";
import { prisma } from "../datasources/prismaClient";

export class PrismaCartProductRepository implements ICartProductRepository {

    async AddProductToCart(data: AddProductToCart, cartId: number): Promise<void> {
        console.log(data)
        console.log(cartId)
        const cartProduct = await prisma.cartProduct.create({
            data: {
                cartId: cartId,
                productId: data.productId,
                quantity_of_products: data.quantity_of_products
            }
        })
        console.log(cartProduct)
        
    }


}