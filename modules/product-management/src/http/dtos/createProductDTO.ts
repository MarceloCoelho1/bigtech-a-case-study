export interface CreateProductDTO {
    name: string;
    price: number;
    reviews: number;
    description: string;
    quantity_in_stock: number;
    category_id?: number
}