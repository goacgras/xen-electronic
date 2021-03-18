import "reflect-metadata";
import express, { Application, Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";

import swaggerUi from "swagger-ui-express";
import * as swaggerDoc from "../swagger.json";

import productRoutes from "./routes/product";
import orderRoutes from "./routes/order";

const app: Application = express();

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.text());
// app.use(express.json({ type: "application/json" }));
app.use(morgan("dev"));
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
        optionsSuccessStatus: 200,
    })
);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use("/api/product", productRoutes);
app.use("/api/order", orderRoutes);
app.get("/", (_: Request, res: Response) => {
    res.send("hello");
});

export default app;
