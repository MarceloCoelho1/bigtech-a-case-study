import { Review } from "@prisma/client";

export class Product {
    constructor(
        public id: string,
        public name: string,
        public price: number,
        public description: string,
        public quantity_in_stock: number,
        public category_id: number | null,
        public low_stock_threshold: number,
        public reviews: Review[],
        public url_image: string | null,
        public price_with_discount: number | null
    ) {}
}

