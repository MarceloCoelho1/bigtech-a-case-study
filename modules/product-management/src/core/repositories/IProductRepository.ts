import { CreateProductDTO } from "../../http/dtos/createProductDTO";
import { UpdateProductDTO } from "../../http/dtos/updateProductDTO";
import { Product } from "../entities/product";

export interface IProductRepository {
    create(data: CreateProductDTO): Promise<Product>
    getAllProducts(): Promise<Product[]>
    updateProduct(data: UpdateProductDTO): Promise<Product>
    findById(id: string): Promise<Product | null>
}