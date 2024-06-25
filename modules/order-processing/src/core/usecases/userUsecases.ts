import { CreateUserDTO } from "../../http/dtos/createUserDTO";
import { UserAlreadyExists } from "../errors/userAlreadyExistsError";
import { IUserRepository } from "../repositories/IUserRepository";
import { IBcryptService } from "../services/IBcryptService";
import { UserWithoutPassword } from "../types/userWithoutPassword";

export class UserUsecases {
    constructor(
        private userRepository: IUserRepository,
        private bcryptRepository: IBcryptService
    ) { }

    async create(data: CreateUserDTO): Promise<UserWithoutPassword> {

        const user = await this.userRepository.findByEmail(data.email)

        if (user) {
            throw new UserAlreadyExists()
        }

        const passwordHashed = await this.bcryptRepository.hash(data.password)

        const userData = {
            ...data,
            password: passwordHashed
        }

        const createdUser = await this.userRepository.create(userData)
        return createdUser

    }

    async getAllUsers(): Promise<UserWithoutPassword[] | Error> {
        try {
            const users = await this.userRepository.getAllUsers()
            return users
        } catch (error) {
            return new Error("Internal Server Error")
        }
    }

}