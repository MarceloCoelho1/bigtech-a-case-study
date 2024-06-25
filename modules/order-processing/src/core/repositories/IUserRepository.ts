import { CreateUserDTO } from "../../http/dtos/createUserDTO";
import { User } from "../entities/user";
import { UserWithoutPassword } from "../types/userWithoutPassword";

export interface IUserRepository {
    create(data: CreateUserDTO): Promise<UserWithoutPassword>
    findByEmail(email: string): Promise<User | null>
    getAllUsers(): Promise<UserWithoutPassword[]>
}