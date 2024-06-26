import { z } from 'zod'

export const InitCheckoutSchema = z.object({
    token: z.string({
        required_error: "The token is required",
        invalid_type_error: "The token must be a string"
    }),
    discountCode: z.string({
        invalid_type_error: "The discount code must be a string"
    }).optional()
        
})