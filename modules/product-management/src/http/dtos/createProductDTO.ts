
export interface CreateProductDTO {
    name: string;
    price: number;
    description: string;
    quantity_in_stock: number;
    category_id?: number;
    low_stock_threshold: number;
}