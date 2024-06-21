import { IBcryptService } from "../adapters/bcrypt.interface";
import { IJwtService } from "../adapters/jwt.interface";
import { IncorrectPassword } from "../errors/IncorrectPassword";
import { UserNotExists } from "../errors/UserNotExists";
import { UserRepository } from "../repositories/UserRepository";
import { ICredentials } from "../types/ICredentials";
import { IMailService } from "../adapters/mail.interface";
import { IResetPassword } from "../types/IResetPassword";
import { InvalidToken } from "../errors/InvalidToken";
import { UserActivationRepository } from "../repositories/UserActivationRepository";
import { UserNotVerified } from "../errors/UserNotVerified";
import { UpdateUserDto } from "../../../presentation/dtos/UpdateUserDto";
import { TokenExpired } from "../errors/TokenExpired";


export class AuthUseCases {
    constructor(
        private userRepository: UserRepository,
        private jwtService: IJwtService,
        private bcryptService: IBcryptService,
        private mailService: IMailService,
        private userActivationRepository: UserActivationRepository
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

        if (!user.is_verified) {
            throw new UserNotVerified()
        }

        const token = this.jwtService.sign({ userId: user.id });
        return token
    }

    async forgotPassword(email: string): Promise<void> {

        const user = await this.userRepository.findByEmail(email)
        if (!user) {
            throw new UserNotExists()
        }

        if (!user.is_verified) {
            throw new UserNotVerified()
        }

        const newToken = this.jwtService.resetToken(user.id)


        let data = {
            to: email,
            subject: "recovery password",
            body: `
                <p><strong>Recovery your password!</strong>!</p>
                <a href="http://localhost:3333/auth/resetpassword?token=${newToken}">Click here!</a>
            `
        }
        await this.mailService.sendMail(data)
    }


    async resetPassword(data: IResetPassword): Promise<void> {
        const { token, password } = data

        const verifiedToken = this.jwtService.verify(token)
        if (!verifiedToken) {
            throw new InvalidToken()
        }
        const user = await this.userRepository.findById(verifiedToken.userId)

        if (!user) {
            throw new UserNotExists()
        }
        let newPasswordHash = await this.bcryptService.hash(password);

        await this.userRepository.update(
            {
                id: user.id,
                password: newPasswordHash
            } as UpdateUserDto
        )

    }

    async verifyUser(token: string): Promise<void> {
        const decoded = this.jwtService.verify(token);

        if (!decoded) {
            throw new InvalidToken();
        }

        const userActivation = await this.userActivationRepository.findByToken(token);

        if (!userActivation) {
            throw new InvalidToken();
        }

        if (userActivation.expiration_date < new Date()) {
            try {
                const userId = userActivation.user_id;
    
                const newActivationToken = this.jwtService.sign({ userId });
    
                const user = await this.userRepository.findById(userId)

                if(!user) {
                    throw new UserNotExists()
                }

                const template = `
                    <p><strong>Recovery your password!</strong></p>
                    <a href="http://localhost:3333/auth/verify?token=${newActivationToken}">Click here!</a>
                `;
    
                const emailData = {
                    to: user.email,
                    subject: "Verify Your Email",
                    body: template
                };
    
                await this.mailService.sendMail(emailData);
    
                console.log(`Token expired. Sent a new token to ${user.email}`);
                throw new TokenExpired()
            } catch (error) {
                console.error("Error handling expired token:", error);
                throw new Error("Failed to handle expired token");
            }
        }

        const user = await this.userRepository.findById(userActivation.user_id);

        if (!user) {
            throw new UserNotExists();
        }

        user.is_verified = true;
        let userData = {
            id: user.id,
            is_verified: user.is_verified
        }
        await this.userRepository.update(userData);
        await this.userActivationRepository.delete(userActivation.id);
    }
}