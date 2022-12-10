// import mongoose from "mongoose";
const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const StorageScheme = new mongoose.Schema(
    {
        url: {
            type:String
        },
        fileName: {
            type: String
        },
    },
    {
        timestamps: true, // createSAt, updateAt
        versionKey: false
    }
);

StorageScheme.plugin(mongooseDelete, {overrideMethods: "all "});

// (nombre coleccion, el esquema creado)
module.exports =  mongoose.model("Almacenamiento", StorageScheme);