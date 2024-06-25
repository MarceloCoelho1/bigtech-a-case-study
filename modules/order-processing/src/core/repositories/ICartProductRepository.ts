import { AddProductToCart } from "../../http/dtos/addProductToCartDTO";

export interface ICartProductRepository {
    AddProductToCart(data: AddProductToCart, cartId: number): Promise<void>
}