import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({

    // api config
    NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
    PORT: z.coerce.number().default(3333),

    // database url
    DATABASE_URL: z.string(),


    // jwt config
    JWT_SECRET: z.string(),
    JWT_EXPIRES_IN: z.string().default('2h'),

    // Stripe api key
    STRIPE_KEY: z.string(),

    // nodemailer config
    EMAIL_USERNAME: z.string(),
    EMAIL_KEY: z.string(),
});

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
    console.error('Invalid environment variables', _env.error.format())

    throw new Error('Invalid environment variable.')
}

export const env = _env.data