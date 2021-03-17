import {
    Column,
    Entity as TOEntity,
    Index,
    JoinColumn,
    ManyToOne,
} from "typeorm";
import Entity from "./Entity";
import { Product } from "./Product";

@TOEntity("orders")
export class Order extends Entity {
    constructor(order: Partial<Order>) {
        super();
        Object.assign(this, order);
    }

    @Index()
    @Column()
    invoiceNumber: string;

    @Column()
    totalPrice: number;

    @Column()
    status: string;

    @Column()
    quantity: number;

    @ManyToOne(() => Product, (product) => product.orders)
    @JoinColumn({ name: "productName", referencedColumnName: "name" })
    productName: Product;
}
