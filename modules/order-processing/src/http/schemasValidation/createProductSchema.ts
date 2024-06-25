import { z } from 'zod'

export const CreateProductSchema = z.object({
    name: z.string({
        required_error: "The name is required",
        invalid_type_error: "The name must be a string"
    }),
    price: z.number({
        required_error: "The price is required",
        invalid_type_error: "The price must be a number"
    })
        
})