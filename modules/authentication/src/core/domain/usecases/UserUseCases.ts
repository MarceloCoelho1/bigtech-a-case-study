import { MailService } from '../../../infra/adapters/MailService';
import { CreateUserDTO } from '../../../presentation/dtos/CreateUserDto';
import { UpdateUserDto } from '../../../presentation/dtos/UpdateUserDto';
import { IBcryptService } from '../adapters/bcrypt.interface';
import { IJwtService } from '../adapters/jwt.interface';
import { User } from '../entities/User';
import { UserAlreadyExistsError } from '../errors/UserAlreadyExists';
import { UserActivationRepository } from '../repositories/UserActivationRepository';
import { UserRepository } from '../repositories/UserRepository';


export class UserUseCases {
  constructor(
    private userRepository: UserRepository,
    private bcryptService: IBcryptService,
    private jwtService: IJwtService,
    private userActivationRepository: UserActivationRepository,
    private mailService: MailService
  ) { }

  async createUser(createUserData: CreateUserDTO): Promise<{ user: User }> {
    const userExist = await this.getUserByEmail(createUserData.email);

    if (userExist) {
      throw new UserAlreadyExistsError();
    }
    createUserData.password = await this.bcryptService.hash(createUserData.password);

    const createdUser = await this.userRepository.create(createUserData);
    const userActivationToken = this.jwtService.sign({ userId: createdUser.id });
    
    const userActivationDate = {
      token: userActivationToken,
      user_id: createdUser.id,
      expiration_date: new Date(Date.now() + 2 * 60 * 60 * 1000),
    }

    await this.userActivationRepository.create(userActivationDate);


    const template = `
            <p><strong>Recovery your password!</strong>!</p>
            <a href="http://localhost:3333/auth/verify?token=${userActivationToken}">Click here!</a>
        `

    let data = {
      to: createdUser.email,
      subject: "verify your email",
      body: template
    }
    await this.mailService.sendMail(data)


    return { user: createdUser };
  }

  async getUserById(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async deleteUser(id: string): Promise<void> {
    return this.userRepository.delete(id);
  }

  async updateUser(user: UpdateUserDto): Promise<User> {
    return this.userRepository.update(user)
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }
}
