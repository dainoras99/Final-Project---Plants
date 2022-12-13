export class OrderItem {
    constructor(public id: number, 
        public quantity: number, 
        public name: string,
        public description: string,
        public imageUrl: string,
        public price: number) {}
}