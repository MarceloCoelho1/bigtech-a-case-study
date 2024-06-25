import { CreateUserDTO } from "../../http/dtos/createUserDTO";
import { LoginUserDTO } from "../../http/dtos/loginUserDTO";
import { InvalidPassword } from "../errors/invalidPasswordError";
import { UserAlreadyExists } from "../errors/userAlreadyExistsError";
import { UserNotExists } from "../errors/userNotExistsError";
import { ICartRepository } from "../repositories/ICartRepository";
import { IUserRepository } from "../repositories/IUserRepository";
import { IBcryptService } from "../services/IBcryptService";
import { IJwtService } from "../services/IJwtService";
import { UserWithoutPassword } from "../types/userWithoutPassword";

export class UserUsecases {
    constructor(
        private userRepository: IUserRepository,
        private bcryptRepository: IBcryptService,
        private jwtRepository: IJwtService,
        private cartRepository: ICartRepository
    ) { }

    async create(data: CreateUserDTO): Promise<string> {
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

        if (!createdUser) {
            throw new Error("Error")
        }

        // create user cart
        await this.cartRepository.create({userId: createdUser.id})
        //

        const token = this.jwtRepository.sign({
            userId: createdUser.id
        })

        return token

    }

    async getAllUsers(): Promise<UserWithoutPassword[] | Error> {
        try {
            const users = await this.userRepository.getAllUsers()
            return users
        } catch (error) {
            return new Error("Internal Server Error")
        }
    }

    async login(data: LoginUserDTO): Promise<string> {
        const user = await this.userRepository.findByEmail(data.email)

        if(!user) {
            throw new UserNotExists()
        }

        const correctPassword = await this.bcryptRepository.compare(data.password, user.password)

        if(!correctPassword) {
            throw new InvalidPassword()
        }

        const token = this.jwtRepository.sign({
            userId: user.id
        })

        return token

    }

}