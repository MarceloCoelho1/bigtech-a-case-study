import { CreateProductDTO } from "../../http/dtos/createProductDTO";
import { Product } from "../entities/product";

export interface IProductRepository {
    create(data: CreateProductDTO): Promise<Product>
    getAllProducts(): Promise<Product[]>
}