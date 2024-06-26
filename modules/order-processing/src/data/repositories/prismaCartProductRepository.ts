import { Product } from "../../core/entities/product";
import { ICartProductRepository } from "../../core/repositories/ICartProductRepository";
import { CartProductReturn } from "../../core/types/cartProductReturn";
import { ProductWithoutCarts } from "../../core/types/productWithoutCarts";
import { AddProductToCart } from "../../http/dtos/addProductToCartDTO";
import { prisma } from "../datasources/prismaClient";

export class PrismaCartProductRepository implements ICartProductRepository {

    async AddProductToCart(data: AddProductToCart, cartId: number): Promise<void> {
        await prisma.cartProduct.create({
            data: {
                cartId: cartId,
                productId: data.productId,
                quantity_of_products: data.quantity_of_products
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
                cartId
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