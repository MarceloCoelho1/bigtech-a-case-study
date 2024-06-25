import { User } from "../../core/entities/user";
import { IUserRepository } from "../../core/repositories/IUserRepository";
import { UserWithoutPassword } from "../../core/types/userWithoutPassword";
import { CreateUserDTO } from "../../http/dtos/createUserDTO";
import { prisma } from "../datasources/prismaClient";

export class PrismaUserRepository implements IUserRepository {
    async create(data: CreateUserDTO): Promise<UserWithoutPassword> {
        const user = await prisma.user.create({
            data,
            select: {
                id: true,
                name: true,
                email: true, 
            }
        })
        return user
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: {email},
        })
        return user
    }

    async getAllUsers(): Promise<UserWithoutPassword[]> {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                password: false,
            }
        })
        return users
    }
}