import { CartProduct } from "@prisma/client";

export class Cart {
    constructor(
        public id: number,
        public userId: string,
        public products: CartProduct[],
    ) {}
}