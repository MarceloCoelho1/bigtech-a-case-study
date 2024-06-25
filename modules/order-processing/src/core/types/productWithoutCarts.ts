import { Product } from "../entities/product";

export type ProductWithoutCarts = Omit<Product, 'carts'>;
