import { FastifyInstance } from "fastify";
import { ProductUsecases } from "../../core/usecases/productUsecase";
import { PrismaProductRepository } from "../../data/repositories/prismaProductRepository";
import { ProductController } from "../controllers/productController";

export const productRoutes = (app: FastifyInstance): void => {
    const productRepository = new PrismaProductRepository()
    const productUsecases = new ProductUsecases(productRepository)
    const productController = new ProductController(productUsecases)

    app.get('/products', (req, reply) => productController.getAllProducts(req, reply));
    app.get('/products/:id', (req, reply) => productController.findProductById(req, reply))
    app.post('/products', (req, reply) => productController.createProduct(req, reply));
    app.patch('/products/:id', (req, reply) => productController.updateProduct(req, reply))
    app.delete('/products/:id', (req, reply) => productController.deleteProduct(req, reply))
    app.patch('/products/buy-a-product', (req, reply) => productController.buyAProduct(req, reply))
    app.patch('/products/stock', (req, reply) => productController.updateStockLevel(req, reply))
    app.get('/products/search', (req, reply) => productController.searchProducts(req, reply))
}