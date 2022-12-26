const supertest = require("supertest");
const userModel = require("../models");
const mongoose = require("mongoose");

// Poder levantar la aplicacion
const app = require("../app");

const testAuthLogin = {
    "email": "usffe@gmail.com",
    "password": "123456"
}

const testAuthRegister = {
    "name":"awww",
    "age": 20,
    "email": "afefa@gmail.com",
    "password": "123456"
}

// Limpiar la base de datos
// beforeAll( async () => {
//      await userModel.deleteMany();
// });

// Cerrar la conexion, evitar errores de memory leaks
// afterAll(() => {
//     mongoose.connection.close();
// });

describe("[AUTH] Prueba de /api/auth", () => {
    test("Debe retornar 404", async () => {
        // -Todo lo que debe hacer la prueba
        const response = await supertest(app)
        .post("/api/auth/login")
        .send(testAuthLogin)

        expect(response.statusCode).toEqual(404)
    })

    test("Registro, debe retornar 200", async () => {

        const response = await supertest(app)
        .post("/api/auth/register")
        .send(testAuthRegister);

        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty("data.token");
        expect(response.body).toHaveProperty("data.user");
    });
})