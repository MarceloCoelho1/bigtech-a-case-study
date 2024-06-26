import { CreateCartDTO } from "../../http/dtos/createCartDTO";
import { CartProduct } from "../entities/cartProduct";

export interface ICartRepository {
    create(data: CreateCartDTO): Promise<void>
    getAllProductsFromCart(id: number): Promise<CartProduct[]>
    clearCart(id: number): Promise<void>
}