// import mongoose, { mongo } from "mongoose";
const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const TrackScheme = new mongoose.Schema(
    {
        name: {
            type: String
        },
        albun: {
            type: String
        },
        cover: {
            type: String,
            validate:{ // valida que la url sea correcta o retorna error
                validator: (req) => {
                    return true;
                },
                message: "ERROR_URL"
            }
        },
        artist: {
            name: {
                type: String
            },
            nickName: {
                type: String
            },
            nacionality: {
                type: String
            }
        },
        duration: {
            start: {
                type: Number
            },
            end: {
                type: Number
            }
        },
        mediaId: {
            type: mongoose.Types.ObjectId
        }
    },
    {
        timestamps: true, // createSAt, updateAt
        versionKey: false
    }
);

TrackScheme.plugin(mongooseDelete, {overrideMethods: "all "});

// (nombre coleccion, Esquema creado)
module.exports = mongoose.model("Canciones", TrackScheme);