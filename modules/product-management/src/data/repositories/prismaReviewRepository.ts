import { Review } from "../../core/entities/review";
import { IReviewRepository } from "../../core/repositories/IReviewRepository";
import { CreateReviewDTO } from "../../http/dtos/createReviewDTO";
import { EditReviewDTO } from "../../http/dtos/editReviewDTO";
import { prisma } from "../datasources/prismaClient";

export class PrismaReviewRepository implements IReviewRepository {
    async addReview(data: CreateReviewDTO): Promise<Review> {
        const review = await prisma.review.create({
            data
        })

        return review
    }

    async getAllReviews(): Promise<Review[]> {
        const reviews = await prisma.review.findMany()
        return reviews
    }

    async editReview(data: EditReviewDTO): Promise<Review> {
        const review = await prisma.review.update({
            where: {
                id: data.id
            }, 
            data
        })

        return review
    }

    async getReviewById(id: number): Promise<Review | null> {
        const review = await prisma.review.findUnique({
            where: {
                id: id
            }
        })
        return review
    }

    async deleteReview(id: number): Promise<void> {
        await prisma.review.delete({
            where: { id }
        })
    }
}