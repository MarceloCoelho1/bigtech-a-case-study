import { CartProduct } from "./cartProduct";

export class Product {
    constructor(
        public id: string,
        public name: string,
        public price: number,
        public carts: CartProduct[],
    ) {}
}