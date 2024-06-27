import { FastifyReply, FastifyRequest } from "fastify";
import { InvalidToken } from "../../core/errors/invalidTokenError";
import { UserNotExists } from "../../core/errors/userNotExistsError";
import { InitCheckoutDTO } from "../dtos/initCheckoutDTO";
import { InitCheckoutSchema } from "../schemasValidation/initCheckoutSchema";
import { CheckoutUsecases } from "../../core/usecases/checkoutUsecases";
import { InvalidDiscountCode } from "../../core/errors/invalidDiscountCodeError";
import { CartIsEmpty } from "../../core/errors/cartIsEmptyError";
import { stripe } from "../../infra/services/StripeService";

export class CheckoutController {
    constructor(
        private checkoutUsecases: CheckoutUsecases
    ) { }

    async initCheckout(req: FastifyRequest, reply: FastifyReply) {
        try {
            const authHeader = req.headers['authorization'];
            const { discountCode } = req.body as { discountCode: string }
            if (!authHeader) {
                return reply.status(401).send({ error: "Unauthorized" })
            }

            const token = authHeader && authHeader.split(' ')[1];
            const checkoutData = {
                token,
                discountCode
            } as InitCheckoutDTO
            const result = InitCheckoutSchema.safeParse(checkoutData)

            if (!result.success) {
                return reply.status(400).send({ errors: result.error.errors })
            }

            const orderDetails = await this.checkoutUsecases.initCheckout(checkoutData)
            console.log(orderDetails.total_price)
            const paymentIntent = await stripe.paymentIntents.create({
                amount: orderDetails.total_price,
                currency: "brl",
                // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
                automatic_payment_methods: {
                    enabled: true,
                },
                receipt_email: orderDetails.email,
                description: 'ok!'
            });


            reply.status(200).send({ clientSecret: paymentIntent.client_secret })
        } catch (error) {
            if (error instanceof InvalidToken) {
                reply.status(error.statusCode).send({ error: error.message });
            } else if (error instanceof UserNotExists) {
                reply.status(error.statusCode).send({ error: error.message });
            } else if (error instanceof InvalidDiscountCode) {
                reply.status(error.statusCode).send({ error: error.message });
            } else if (error instanceof CartIsEmpty) {
                reply.status(error.statusCode).send({ error: error.message });
            } else {
                reply.status(500).send({ error: 'Internal Server Error' });
            }
        }
    }

}