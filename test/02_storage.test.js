const userModel = require("../models/nosql/users")
const { tokenSing } = require("../utils/handleJwt")
const supertest = require("supertest");
const app = require("../app");

let JWT_TOKEN = "";


beforeAll( async () => {
    // Autorizarce para acceder a las demas rutas
    const user = await userModel.findOne({ email: "user@gmail.com"});
    JWT_TOKEN = await tokenSing(user);
});

describe("[STORAGE] Retornar todos los archivos", () => {

    test("Debe retornar 200", async () => {
        const response = await supertest(app)
        .get("/api/storage")
        .set("Authorization", `Bearer ${JWT_TOKEN}`);
        
        expect(response.statusCode).toEqual(200);
    });
});