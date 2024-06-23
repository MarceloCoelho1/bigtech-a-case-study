import { BuyAProductDTO } from "../../http/dtos/buyAProductDTO";
import { CreateProductDTO } from "../../http/dtos/createProductDTO";
import { SearchQueryDTO } from "../../http/dtos/searchQueryDTO";
import { UpdateProductDTO } from "../../http/dtos/updateProductDTO";
import { Product } from "../entities/product";

export interface IProductRepository {
    create(data: CreateProductDTO): Promise<Product>
    getAllProducts(): Promise<Product[]>
    updateProduct(data: UpdateProductDTO): Promise<Product>
    findById(id: string): Promise<Product | null>
    deleteProduct(id: string): Promise<void>
    buyAProduct(data: BuyAProductDTO, newQuantityInStock: number): Promise<void>
    updateStockLevel(productId: string, newQuantityInStock: number): Promise<Product>
    searchProducts(data: SearchQueryDTO): Promise<Product[] | null>
}