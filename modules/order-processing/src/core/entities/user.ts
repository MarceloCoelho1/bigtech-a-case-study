import { Cart } from "./cart";

export class User {
    constructor(
        public id: string,
        public name: string,
        public email: string,
        public password: string,
        public cart: Cart | null
    ) {}
}