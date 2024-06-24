export interface UpdateProductDTO {
    id: string;
    name?: string;
    price?: number;
    description?: string;
    quantity_in_stock?: number;
}