import { CreateProductDTO } from "../../http/dtos/createProductDTO";
import { ProductWithoutCarts } from "../types/productWithoutCarts";

export interface IProductRepository {
    create(data: CreateProductDTO): Promise<ProductWithoutCarts>
    getAllProducts(): Promise<ProductWithoutCarts[]>
    findById(id: string): Promise<ProductWithoutCarts | null>
}