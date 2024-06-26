import { CartProduct } from "../../core/entities/cartProduct";
import { ICartRepository } from "../../core/repositories/ICartRepository";
import { CreateCartDTO } from "../../http/dtos/createCartDTO";
import { prisma } from "../datasources/prismaClient";

export class PrismaCartRepository implements ICartRepository {

    async create(data: CreateCartDTO): Promise<void> {
        await prisma.cart.create({
            data,
            include: {
                products: true
            }
        })
    }
    
    async getAllProductsFromCart(id: number): Promise<CartProduct[]> {
        const cart = await prisma.cart.findUnique({
            where: { id },
            select: {
                products: true
            }
        });
    
        if (!cart) {
            throw new Error("Cart not found");
        }
    
        return cart.products;
    }

}