import { z } from 'zod'

export const LoginUserSchema = z.object({
    email: z.string().email(
        {message: "Invalid email address"}
    ),
    password: z.string({invalid_type_error: "password must be a string"})
        
})