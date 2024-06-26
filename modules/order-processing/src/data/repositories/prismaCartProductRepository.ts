import { ICartProductRepository } from "../../core/repositories/ICartProductRepository";
import { CartProductReturn } from "../../core/types/cartProductReturn";
import { AddProductToCart } from "../../http/dtos/addProductToCartDTO";
import { prisma } from "../datasources/prismaClient";

export class PrismaCartProductRepository implements ICartProductRepository {

    async AddProductToCart(data: AddProductToCart, cartId: number, unit_price: number): Promise<void> {

        await prisma.cartProduct.create({
            data: {
                productId: data.productId,
                quantity_of_products: data.quantity_of_products,
                cartId: cartId,
                unit_price
            }
        })

    }

    async RemoveItemFromCart(productId: string, cartId: number): Promise<void> {
        await prisma.cartProduct.delete({
            where: {
                id: cartId,
                productId: productId
            }
        })
    }

    async findProductAtCartById(id: string, cartId: number): Promise<CartProductReturn | null> {
        const product = await prisma.cartProduct.findUnique({
            where: {
                productId: id,
                cartId: cartId
            }
        })

        return product
    }

    async updateProductQuantity(id: string, quantity: number, cartId: number): Promise<void> {
        await prisma.cartProduct.update({
            where: {
                productId: id,
                cartId: cartId
            },
            data: {
                quantity_of_products: quantity
            }
        })
    }

}