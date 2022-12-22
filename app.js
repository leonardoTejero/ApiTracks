
const express = require("express");
const cors = require("cors");
const openApiConfiguration = require("./docs/swagger");
const swaggerUI = require("swagger-ui-express");
require("dotenv").config();
const dbConnect = require("./config/mongo.js");


const app = express();
app.use(cors());

// Hacer que la aplicacion acepte json
app.use(express.json());

// Acceder a los archivos de la carpeta storage
app.use(express.static("storage"));

//Rutas. Por defecto va al index
app.use("/api",require("./routes")); 

//Rutas de la documentacion
app.use("/api/doc", swaggerUI.serve, swaggerUI.setup(openApiConfiguration));


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("App activa en el puerto "+ port)
});    

dbConnect();