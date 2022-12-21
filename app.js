
const express = require("express");
const cors = require("cors");
const ruta = require("./routes/index");
const config = require("dotenv").config();
const dbConnect = require("./config/mongo.js");

const app = express();
app.use(cors());
// La aplicacion acepte json
app.use(express.json());
// Acceder a los archivos de la carpeta storage
app.use(express.static("storage"));

//Rutas
app.use("/api", ruta); 

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("App activa en el puerto "+ port)
});    

dbConnect();