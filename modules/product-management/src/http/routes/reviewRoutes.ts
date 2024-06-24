import { FastifyInstance } from "fastify";
import { PrismaReviewRepository } from "../../data/repositories/prismaReviewRepository";
import { ReviewUsecases } from "../../core/usecases/reviewUsecase";
import { ReviewController } from "../controllers/reviewController";
import { PrismaProductRepository } from "../../data/repositories/prismaProductRepository";

export const reviewRoutes = (app: FastifyInstance): void => {
    const reviewRepository = new PrismaReviewRepository()
    const productRepository = new PrismaProductRepository()
    const reviewUsecases = new ReviewUsecases(reviewRepository, productRepository)
    const reviewController = new ReviewController(reviewUsecases)

    app.get('/review', (req, reply) => reviewController.getAllReviews(req, reply))
    app.post('/review', (req, reply) => reviewController.addReview(req, reply));
    app.patch('/review/edit', (req, reply) => reviewController.editReview(req, reply));
    app.delete('/review/:id', (req, reply) => reviewController.deleteReview(req, reply))
}