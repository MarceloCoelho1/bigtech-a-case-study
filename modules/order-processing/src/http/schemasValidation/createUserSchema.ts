import { z } from 'zod'

export const CreateUserSchema = z.object({
    name: z.string({
        required_error: "The name is required",
        invalid_type_error: "The name must be a string"
    }),
    email: z.string().email(
        {message: "Invalid email address"}
    ),
    password: z.string().min(8, {
        message: "password must be 8 or more characters long"
    })
        
})