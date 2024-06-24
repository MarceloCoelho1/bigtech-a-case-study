import { FastifyReply, FastifyRequest } from "fastify";
import { ReviewUsecases } from "../../core/usecases/reviewUsecase";
import { ProductNotFound } from "../../core/errors/productNotFoundError";
import { CreateReviewDTO } from "../dtos/createReviewDTO";
import { EditReviewDTO } from "../dtos/editReviewDTO";
import { ReviewNotFound } from "../../core/errors/reviewNotFoundError";
import { ReviewInvalidRatingRange } from "../../core/errors/reviewInvalidRatingRangeError";

export class ReviewController {
    constructor(
        private reviewUsecases: ReviewUsecases
    ) {}


    async getAllReviews(req: FastifyRequest, reply: FastifyReply) {
        try {
            const reviews = await this.reviewUsecases.getAllReviews()
            reply.status(201).send({ reviews: reviews })
        } catch (error) {
            reply.status(500).send({ error: 'Internal Server Error' });
        }
    }

    async addReview(req: FastifyRequest, reply: FastifyReply) {
        try {
            const createReviewData = req.body as CreateReviewDTO
            const formatedCreateReviewData = {
                ...createReviewData,
                rating: Number(createReviewData.rating)
            }
            const review = await this.reviewUsecases.addReview(formatedCreateReviewData)
            reply.status(201).send({ review: review })
        } catch (error) {
            if(error instanceof ProductNotFound) {
                reply.status(error.statusCode).send({ error: error.message });
            } else if (error instanceof ReviewInvalidRatingRange) {
                reply.status(error.statusCode).send({ error: error.message });
            } else {
                reply.status(500).send({ error: 'Internal Server Error' });
            }
        }
    }

    async editReview(req: FastifyRequest, reply: FastifyReply) {
        try {
            const editReviewData = req.body as EditReviewDTO
            const formatedEditReviewData = {
                ...editReviewData,
                rating: Number(editReviewData.rating),
                id: Number(editReviewData.id)
            }
            const review = await this.reviewUsecases.editReview(formatedEditReviewData)
            reply.status(200).send({ review: review })
        } catch (error) {
            if(error instanceof ProductNotFound) {
                reply.status(error.statusCode).send({ error: error.message });
            } else if (error instanceof ReviewNotFound) {
                reply.status(error.statusCode).send({ error: error.message });
            } else if (error instanceof ReviewInvalidRatingRange) {
                reply.status(error.statusCode).send({ error: error.message });
            } else {
                reply.status(500).send({ error: 'Internal Server Error' });
            }
        }
    }

    async deleteReview(req: FastifyRequest, reply: FastifyReply) {
        try {
            const { id } = req.params as {id: number}

            const formatedId = Number(id)

            await this.reviewUsecases.deleteReview(formatedId)
            reply.status(200)
        } catch (error) {
            if (error instanceof ReviewNotFound) {
                reply.status(error.statusCode).send({ error: error.message });
            } else {
                reply.status(500).send({ error: 'Internal Server Error' });
            }
        }
    }
}
