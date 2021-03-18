import { Connection } from "typeorm";
import { Seeder } from "typeorm-seeding";
import { Product } from "../entities/Product";

function timePlus(duration = 0) {
    const time = new Date("2020-11-07 07:01:43.18").getTime();

    return new Date(time + duration).toISOString();
}

export default class createData implements Seeder {
    public async run(_: any, connection: Connection): Promise<any> {
        const minute = 1000 * 60;
        //create products
        await connection
            .createQueryBuilder()
            .insert()
            .into(Product)
            .values([
                {
                    name: "Macbook pro",
                    category: "laptop",
                    price: 1400,
                    createdAt: timePlus(minute * 2),
                    updatedAt: timePlus(minute * 2),
                },
                {
                    name: "Samsung",
                    category: "laptop",
                    price: 1900,
                    createdAt: timePlus(minute * 3),
                    updatedAt: timePlus(minute * 3),
                },
                {
                    name: "Asus",
                    category: "laptop",
                    price: 800,
                    createdAt: timePlus(minute * 4),
                    updatedAt: timePlus(minute * 4),
                },
                {
                    name: "Lenovo",
                    category: "laptop",
                    price: 1200,
                    createdAt: timePlus(minute * 5),
                    updatedAt: timePlus(minute * 5),
                },
                {
                    name: "Hp",
                    category: "laptop",
                    price: 900,
                    createdAt: timePlus(minute * 6),
                    updatedAt: timePlus(minute * 6),
                },
                {
                    name: "Samsung s7",
                    category: "phone",
                    price: 1400,
                    createdAt: timePlus(minute * 7),
                    updatedAt: timePlus(minute * 7),
                },
                {
                    name: "Oppo",
                    category: "phone",
                    price: 350,
                    createdAt: timePlus(minute * 8),
                    updatedAt: timePlus(minute * 8),
                },
                {
                    name: "Vivo",
                    category: "phone",
                    price: 269,
                    createdAt: timePlus(minute * 9),
                    updatedAt: timePlus(minute * 9),
                },
                {
                    name: "Redmi",
                    category: "phone",
                    price: 560,
                    createdAt: timePlus(minute * 10),
                    updatedAt: timePlus(minute * 10),
                },
                {
                    name: "Huawei",
                    category: "phone",
                    price: 780,
                    createdAt: timePlus(minute * 11),
                    updatedAt: timePlus(minute * 11),
                },
            ])
            .execute();
    }
}
