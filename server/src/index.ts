import app from "./app";
import { createConnection } from "typeorm";

const main = async () => {
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
};
main().catch((err) => {
    console.log(err);
});
