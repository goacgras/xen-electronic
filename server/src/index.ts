import app from "./app";
import { createConnection } from "typeorm";

const main = async () => {
    const port = process.env.PORT || 5000;

    app.listen(port, async () => {
        console.log(`server running at port ${port}`);
        let retries = 5;
        while (retries) {
            try {
                await createConnection();
                break;
            } catch (err) {
                console.log(err);
                retries -= 1;
                console.log(`retries left: ${retries}`);
                await new Promise((res) => setTimeout(res, 5000));
            }
            console.log("Database connected");
        }
    });
};
main().catch((err) => {
    console.log(err);
});
