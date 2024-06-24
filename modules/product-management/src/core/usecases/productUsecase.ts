import { BuyAProductDTO } from "../../http/dtos/buyAProductDTO";
import { CreateProductDTO } from "../../http/dtos/createProductDTO";
import { SearchQueryDTO } from "../../http/dtos/searchQueryDTO";
import { UpdateProductDTO } from "../../http/dtos/updateProductDTO";
import { UpdateStockLevel } from "../../http/dtos/updateStockLevelDTO";
import { uploadImageLib } from "../../lib/upload-image";
import { Product } from "../entities/product";
import { ProductNotFound } from "../errors/productNotFoundError";
import { ProductOutOfStock } from "../errors/productOutOfStockError";
import { IProductRepository } from "../repositories/IProductRepository";

export class ProductUsecases {
    constructor(
        private productRepository: IProductRepository
    ) {}

    async createProduct(data: CreateProductDTO): Promise<Product> {

        // if you want to add for user can create a product, implement validation here. 
        // (validation implemented in the authentication module)

        const product = await this.productRepository.create(data)
        return product
    }

    async getAllProducts(): Promise<Product[]> {
        const product = await this.productRepository.getAllProducts()
        return product
    }

    async findById(id: string): Promise<Product | null> {
        const product = await this.productRepository.findById(id)
        return product
    }

    async updateProduct(data: UpdateProductDTO): Promise<Product> {

        const product = await this.findById(data.id)

        if(!product) {
            throw new ProductNotFound()
        }

        const updatedProduct = await this.productRepository.updateProduct(data)
        return updatedProduct
    }

    async deleteProduct(id: string): Promise<void> {

        const product = await this.findById(id)

        if(!product) {
            throw new ProductNotFound()
        }

        await this.productRepository.deleteProduct(id)
    } 

    async buyAProduct(data: BuyAProductDTO): Promise<void> {
        const product = await this.findById(data.productId)
        
        if(!product) {
            throw new ProductNotFound()
        }

        if(product.quantity_in_stock < data.quantity) {
            throw new ProductOutOfStock()
        }

        const newQuantityInStock = product.quantity_in_stock - data.quantity

        if(newQuantityInStock <= product.low_stock_threshold) {
            // send email (implemented in the authentication module)
        }
        

        await this.productRepository.buyAProduct(data, newQuantityInStock)

    }

    async updateStockLevel(data: UpdateStockLevel): Promise<Product> {
        const product = await this.findById(data.productId)

        if(!product) {
            throw new ProductNotFound()
        }

        const newQuantityInStock = data.quantity + product.quantity_in_stock

        const updatedProduct = await this.productRepository.updateStockLevel(data.productId, newQuantityInStock)
        return updatedProduct
    }

    async searchProducts(data: SearchQueryDTO): Promise<Product[] | null> {
        const products = await this.productRepository.searchProducts(data)
        return products
    }

    async uploadProductImage(file: Uint8Array, id: string, mimitype: string) {
        const product = await this.findById(id)

        if(!product) {
            throw new ProductNotFound()
        }

        const response = await uploadImageLib(file, id, mimitype)

        if(!response.downloadURL) {
            return response
        }

        const updateProduct = await this.productRepository.updateProductImage(id, response.downloadURL)
        return updateProduct
    }
}