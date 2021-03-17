import { Column, Entity as TOEntity, Index, OneToMany } from "typeorm";
import Entity from "./Entity";
import { Order } from "./Order";

@TOEntity("products")
export class Product extends Entity {
    constructor(product: Partial<Product>) {
        super();
        Object.assign(this, product);
    }

    @Index()
    @Column({ unique: true })
    name: string;

    @Column()
    category: string;

    @Column()
    price: number;

    @OneToMany(() => Order, (order) => order.productName)
    orders?: Order[];
}
