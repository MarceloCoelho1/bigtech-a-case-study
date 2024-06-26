
import { z } from 'zod'

export const UpdateProductQuantitySchema = z.object({
    token: z.string({
        required_error: "the token is required",
        invalid_type_error: "the name must be a string"
    }),
    productId: z.string({
        required_error: "The productId is required",
        invalid_type_error: "The productId must be a string"
    }),
    quantity: z.number({
        required_error: "The productId is required",
        invalid_type_error: "The productId must be a string"
    }).min(1, {message: "the number must be greater than 0"})
        
})