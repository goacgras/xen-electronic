import { Request, Response, Router } from "express";
import { Product } from "../entities/Product";

const getProduct = async (req: Request, res: Response) => {
    const category: string = req.params.category;

    try {
        const products = await Product.find({
            where: {
                category,
            },
            order: {
                createdAt: "DESC",
            },
        });

        if (!products) {
            return res.status(400).json({ product: "Product not found" });
        }

        return res.json(products);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "something went wrong" });
    }
};

const addProduct = async (req: Request, res: Response) => {
    const { name, category, price } = req.body;

    try {
        const newProduct = new Product({
            name,
            category,
            price,
        });

        await newProduct.save();
        return res.json(newProduct);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "something went wrong" });
    }
};

const router = Router();
router.get("/:category", getProduct);
router.post("/", addProduct);

export default router;
