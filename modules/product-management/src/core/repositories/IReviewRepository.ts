import { CreateReviewDTO } from "../../http/dtos/createReviewDTO";
import { EditReviewDTO } from "../../http/dtos/editReviewDTO";
import { Review } from "../entities/review";

export interface IReviewRepository {
    addReview(data: CreateReviewDTO): Promise<Review>
    getAllReviews(): Promise<Review[]>
    editReview(data: EditReviewDTO): Promise<Review>
    getReviewById(id: number): Promise<Review | null>
    deleteReview(id: number): Promise<void>
}