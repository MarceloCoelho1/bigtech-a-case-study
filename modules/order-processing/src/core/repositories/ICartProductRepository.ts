import { AddProductToCart } from "../../http/dtos/addProductToCartDTO";
import { CartProductReturn } from "../types/cartProductReturn";

export interface ICartProductRepository {
    AddProductToCart(data: AddProductToCart, cartId: number): Promise<void>
    RemoveItemFromCart(productId: string, cartId: number): Promise<void>
    findProductAtCartById(id: string, cartId: number): Promise<CartProductReturn | null>
}