import app from "../app";
import request from "supertest";

// describe("GET /api/product/:category", () => {
//     it("it should GET product by category", async (done) => {
//         const category = "a";
//         const res = await request(app).get(`/api/product/${category}`);
//         expect(res.type).toEqual("application/json");
//         expect(res.status).toEqual(200);
//         done();
//     });
// });

describe("GET / - a simple api endpoint", () => {
    it("Hello API Request", async () => {
        const c: string = "laptop";
        const result = await request(app).get(`/api/product/${c}`);
        expect(result.type).toEqual("application/json");
        expect(result.status).toEqual(200);
    });
});
