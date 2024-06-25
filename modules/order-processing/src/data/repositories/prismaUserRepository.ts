import { User } from "../../core/entities/user";
import { IUserRepository } from "../../core/repositories/IUserRepository";
import { UserWithoutPassword } from "../../core/types/userWithoutPassword";
import { CreateUserDTO } from "../../http/dtos/createUserDTO";
import { prisma } from "../datasources/prismaClient";

export class PrismaUserRepository implements IUserRepository {
    async create(data: CreateUserDTO): Promise<User> {
        const user = await prisma.user.create({
            data,
            include: {
                cart: true
            }
        })
        return user
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: {email},
            include: {
                cart: true
            }
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
                cart: true
            }
        })
        return users
    }

    async findById(id: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: {id},
            include: {
                cart: true
            }
        })
        
        return user
    }
}