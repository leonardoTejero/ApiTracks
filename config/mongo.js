
const mongoose = require("mongoose");

const NODE_ENV = process.env.NODE_ENV;

const dbConnect = () => {
    const DB_URI = (NODE_ENV == "test") ? process.env.DB_URI_TEST : process.env.DB_URI;
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