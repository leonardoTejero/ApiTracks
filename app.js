
const express = require("express");
const cors = require("cors");
const openApiConfiguration = require("./documentation/swagger");
const swaggerUI = require("swagger-ui-express");
require("dotenv").config();
const dbConnect = require("./config/mongo.js");

// Ambiente
const NODE_ENV = process.env.NODE_ENV || "development";
const app = express();

// Permite peticiones cruzadas como ajax
app.use(cors());

// Hacer que la aplicacion acepte json
app.use(express.json());

// Acceder a los archivos de la carpeta storage
app.use(express.static("storage"));

//Rutas. Por defecto va al index
app.use("/api",require("./routes")); 

//Rutas de la documentacion
app.use("/api/documentation", swaggerUI.serve, swaggerUI.setup(openApiConfiguration));


const port = process.env.PORT || 3000;

if(NODE_ENV !== "test")
    app.listen(port, () => {
        console.log("App activa en el puerto "+ port)
});    

dbConnect();

// Poder usar en tests
module.exports = app;