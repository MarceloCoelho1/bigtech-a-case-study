import { IBcryptService } from "../adapters/bcrypt.interface";
import { IJwtService } from "../adapters/jwt.interface";
import { IncorrectPassword } from "../errors/IncorrectPassword";
import { UserNotExists } from "../errors/UserNotExists";
import { UserRepository } from "../repositories/UserRepository";
import { ICredentials } from "../types/ICredentials";
import { IMailService } from "../adapters/mail.interface";
import { IResetPassword } from "../types/IResetPassword";
import { InvalidToken } from "../errors/InvalidToken";


export class AuthUseCases {
    constructor(
        private userRepository: UserRepository,
        private jwtService: IJwtService,
        private bcryptService: IBcryptService,
        private mailService: IMailService
    ) { }

    async login(credentials: ICredentials): Promise<string> {
        const user = await this.userRepository.findByEmail(credentials.email);
        if (!user) {
            throw new UserNotExists();
        }

        const isUser = await this.bcryptService.compare(credentials.password, user.passwordHash)

        if (!isUser) {
            throw new IncorrectPassword()
        }

        const token = this.jwtService.sign({ userId: user.id });
        return token
    }

    async forgotPassword(email: string): Promise<void> {

        const user = await this.userRepository.findByEmail(email)
        if (!user) {
            throw new UserNotExists()
        }
        const newToken = this.jwtService.resetToken(user.id)


        let data = {
            to: email,
            subject: "recovery password",
            body: newToken
        }
        await this.mailService.sendMail(data)
    }


    async resetPassword(data: IResetPassword): Promise<void> {
        const { token, password } = data

        const verifiedToken = this.jwtService.verify(token)
        if(!verifiedToken) {
            throw new InvalidToken()
        }
        const user = await this.userRepository.findById(verifiedToken.userId)

        if(!user) {
            throw new UserNotExists()
        }
        
        let newPasswordHash = await this.bcryptService.hash(password);

        let newUserValues = {
            ...user,
            passwordHash: newPasswordHash
        }

        await this.userRepository.update(newUserValues)

    }
}