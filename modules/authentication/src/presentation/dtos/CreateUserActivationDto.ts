export interface CreateUserActivationDto {
    token: string
    user_id: string
    expiration_date: Date
}