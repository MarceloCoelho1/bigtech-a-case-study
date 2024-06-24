import { CreateReviewDTO } from "../../http/dtos/createReviewDTO";
import { EditReviewDTO } from "../../http/dtos/editReviewDTO";
import { Review } from "../entities/review";
import { ProductNotFound } from "../errors/productNotFoundError";
import { ReviewInvalidRatingRange } from "../errors/reviewInvalidRatingRangeError";
import { ReviewNotFound } from "../errors/reviewNotFoundError";
import { IProductRepository } from "../repositories/IProductRepository";
import { IReviewRepository } from "../repositories/IReviewRepository";

export class ReviewUsecases {
    constructor(
        private reviewRepository: IReviewRepository,
        private productRepository: IProductRepository
    ) {}

    async addReview(data: CreateReviewDTO): Promise<Review> {

        const product = await this.productRepository.findById(data.productId)

        if(!product) {
            throw new ProductNotFound()
        }

        // add user verification if you want! (implemented in the authentication module)

        if(data.rating < 0 || data.rating > 10) {
            throw new ReviewInvalidRatingRange()
        }

        const review = await this.reviewRepository.addReview(data)
        return review
    }

    async getAllReviews(): Promise<Review[]> {
        const reviews = await this.reviewRepository.getAllReviews()
        return reviews
    }

    async editReview(data: EditReviewDTO): Promise<Review> {
        const product = this.productRepository.findById(data.productId)

        if(!product) {
            throw new ProductNotFound()
        }

        const review = this.getReviewById(data.id)

        if(!review) {
            throw new ReviewNotFound()
        }

        // add user verification if you want! (implemented in the authentication module)

        if(data.rating && data.rating < 0 || data.rating && data.rating > 10) {
            throw new ReviewInvalidRatingRange()
        }

        const updatedReview = this.reviewRepository.editReview(data)
        return updatedReview
    }

    async getReviewById(id: number): Promise<Review | null> {
        const review = await this.reviewRepository.getReviewById(id)
        return review
    }

    async deleteReview(id: number): Promise<void> {
        const review = await this.getReviewById(id)

        if(!review) {
            throw new ReviewNotFound()
        }

        // add user verification if you want! (implemented in the authentication module)

        await this.reviewRepository.deleteReview(id)
    }
}