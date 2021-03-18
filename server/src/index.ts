// import "reflect-metadata";
// import express, { Application } from "express";
// import morgan from "morgan";
// import cors from "cors";

// import swaggerUi from "swagger-ui-express";
// import * as swaggerDoc from "../swagger.json";
// import { createConnection } from "typeorm";

// import productRoutes from "./routes/product";
// import orderRoutes from "./routes/order";

// const app: Application = express();

// const port = process.env.PORT || 5000;

// app.use(express.json());
// app.use(morgan("dev"));
// app.use(
//     cors({
//         origin: "http://localhost:3000",
//         credentials: true,
//         optionsSuccessStatus: 200,
//     })
// );

// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
// app.use("/api/product", productRoutes);
// app.use("/api/order", orderRoutes);

import app from "./app";
import { createConnection } from "typeorm";

const port = process.env.PORT || 5000;

app.listen(port, async () => {
    console.log(`server running at port ${port}`);
    try {
        await createConnection();
        console.log("Database connected");
    } catch (err) {
        console.log(err);
    }
});
