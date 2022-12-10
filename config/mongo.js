// import mongoose from "mongoose";
const mongoose = require("mongoose");


const dbConnect = () => {
    const DB_URI = process.env.DB_URI;
    mongoose.connect(
        DB_URI, {
        keepAlive: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
     (error, res) => {
            if(!error){
                console.log("Conexion exitosa");
            }else{
                console.log("*** !Error de conexion¡ ***", error.message);
            }
    });
};

module.exports = dbConnect;

// export default dbConnect;