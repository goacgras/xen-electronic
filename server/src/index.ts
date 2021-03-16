import "reflect-metadata";
import express, { Application } from "express";
import morgan from "morgan";

import swaggerUi from "swagger-ui-express";
import * as swaggerDoc from "../swagger.json";

const app: Application = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(morgan("dev"));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.listen(port, () => {
    console.log(`server running at port ${port}`);
});
