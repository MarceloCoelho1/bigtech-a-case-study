export interface CreateUserDTO {
    email: string;
    name: string;
    password: string;
    role?: string;
}