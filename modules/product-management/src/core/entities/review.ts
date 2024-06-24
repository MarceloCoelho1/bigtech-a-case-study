export class Review {
    constructor(
        public id: number,
        public text: string,
        public rating: number,
        public productId: string
    ) {}
}