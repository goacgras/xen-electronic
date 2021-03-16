import "reflect-metadata";
import express, { Application } from "express";
import morgan from "morgan";

const app: Application = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(morgan("dev"));

app.listen(port, () => {
    console.log(`server running at port ${port}`);
});
