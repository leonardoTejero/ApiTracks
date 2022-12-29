
const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const UserScheme = new mongoose.Schema(
    {
        name: {
            type:String
        },
        age: {
            type:Number
        },
        email: {
            type:String,
            unique: true
        },
        password: {
            type: String,
            select:false // evita devolver la cotraseña en las busquedas
        },
        role: {
            type:["user", "admin"],
            default: "user"
        }
    },
    {
        timestamps: true, // createSAt, updateAt
        versionKey: false
    }
);

UserScheme.plugin(mongooseDelete, {overrideMethods: "all"});

// (nombre coleccion, el esquema creado)
module.exports = mongoose.model("Usuarios", UserScheme);