export interface UpdateProductDTO {
    id: string;
    name?: string;
    price?: number;
    reviews?: number;
    description?: string;
    quantity_in_stock?: number;
}