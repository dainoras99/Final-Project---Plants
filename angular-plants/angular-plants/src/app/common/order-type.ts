import { Delivery } from "./delivery";
import { Parcel } from "./parcel";
import { Shop } from "./shop";

export class OrderType {
    constructor(public id: number, public orderTypeName: string, public delivery: Delivery, public parcel: Parcel, public shop: Shop) {}
}
