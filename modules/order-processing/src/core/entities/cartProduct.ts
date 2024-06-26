import { Product } from "./product";

export class CartProduct {
    constructor(
        public id: number,
        public cartId: number,
        public productId: string,
        public unit_price: number,
        public quantity_of_products: number
    ) {}
}
