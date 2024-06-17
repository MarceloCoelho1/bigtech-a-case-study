import { IBcryptService } from "../adapters/bcrypt.interface";
import { IJwtService } from "../adapters/jwt.interface";
import { IncorrectPassword } from "../errors/IncorrectPassword";
import { UserNotExists } from "../errors/UserNotExists";
import { UserRepository } from "../repositories/UserRepository";
import { ICredentials } from "../types/ICredentials";


export class AuthUseCases {
    constructor(
        private userRepository: UserRepository,
        private jwtService: IJwtService,
        private bcryptService: IBcryptService
    ) { }

    async login(credentials: ICredentials): Promise<string> {
        const user = await this.userRepository.findByEmail(credentials.email);
        if (!user) {
            throw new UserNotExists();
        }

        const isUser = await this.bcryptService.compare(credentials.password, user.passwordHash)

        if(!isUser) {
            throw new IncorrectPassword()
        }

        const token = this.jwtService.sign({ userId: user.id });
        return token
    }
}