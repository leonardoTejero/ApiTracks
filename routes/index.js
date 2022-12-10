// import express from "express";
// import fs from "fs";
// import path from "path";
// import url from "url";
// import tracks from "./tracks.js";

const express = require("Express");
const fs = require("fs");

const router = express.Router();

// ruta del archivo en la maquina c/......
const PATH_ROUTES = __dirname; 
// const __filename = url.fileURLToPath(import.meta.url);
// const PATH_ROUTES = path.dirname(__filename); 

const removeExtension = (fileName) => {
    return fileName.split('.').shift();
};

fs.readdirSync(PATH_ROUTES).filter((file) => {
    const name = removeExtension(file);
    if(name !== "index"){ 
         // http://localhost:3000/api/tracks || storage || nombreArchivo
        router.use(`/${name}`, require(`./${file}`)); //  import(`/${file}`)
    }
});

module.exports = router;
// export default router;

