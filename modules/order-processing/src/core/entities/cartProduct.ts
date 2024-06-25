import { Product } from "./product";

export class CartProduct {
    constructor(
        public id: number,
        public cartId: number,
        public productId: string,
        public quantity_of_products: number
    ) {}
}
