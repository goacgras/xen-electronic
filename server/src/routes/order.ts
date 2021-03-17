import { Request, response, Response, Router } from "express";
import { Order } from "../entities/Order";
import { Product } from "../entities/Product";
import { makeId } from "../utils/helpers";

interface OrderInput {
    name: string;
    quantity: number;
}

const placeOrder = async (req: Request, res: Response) => {
    const orders: OrderInput[] = req.body.orders;

    const invoiceNumber = makeId(7);

    try {
        const newOrders = await Promise.all(
            orders.map(async (o) => {
                const product = await Product.findOne({
                    where: {
                        name: o.name,
                    },
                });

                const totalPrice: number = product!.price * o.quantity;

                const newOrder = new Order({
                    invoiceNumber,
                    totalPrice,
                    status: "RESERVED",
                    quantity: o.quantity,
                    productName: product,
                });

                await newOrder.save();

                return newOrder;
            })
        );

        const accumulativePrice = newOrders.reduce(
            (prev, curr) => prev + curr.totalPrice,
            0
        );

        return res.json({
            invoiceNumber,
            accumulativePrice,
            newOrders,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "something went wrong" });
    }
};

const payOrder = async (req: Request, res: Response) => {
    const invoiceNumber: string = req.params.invoiceNumber;

    try {
        const orders = await Order.find({
            where: {
                invoiceNumber,
            },
        });

        Promise.all(
            orders.map(async (o) => {
                o.status = "PAID";
                await o.save();
            })
        );

        return res.json({ status: "success" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Something went wrong" });
    }
};

const router = Router();
router.post("/", placeOrder);
router.post("/:invoiceNumber/pay", payOrder);

export default router;
