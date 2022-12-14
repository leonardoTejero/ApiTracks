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

/**
 * Metodo para relacionar la cancion con el archivo del storage
 */
TrackScheme.statics.findAllData = function () {
    const joinData = this.aggregate([
        {
            $lookup: {
                from: "almacenamientos", // Tracks --> storage(nombreColeccion)
                localField: "mediaId", // tracks.mediaId
                foreignField: "_id", // storege._id
                as: "audio" // Alias
            }
        },
        {
            $unwind: "$audio" // quitar los resultados de audio del arreglo a solo objetos
        }
    ]);
    return joinData
};

/**
 * Relacionar el archivo de audio de una cancion
 * @param {*} id 
 * @returns 
 */
TrackScheme.statics.findOneData = function (id) {
    const joinData = this.aggregate([
        {
            $match: {
                _id: mongoose.Types.ObjectId(id)
            }
        },
        {
            $lookup: {
                from: "almacenamientos", // Tracks --> storage(nombreColeccion)
                localField: "mediaId", // tracks.mediaId
                foreignField: "_id", // storege._id
                as: "audio" // Alias
            }
        },
        {
            $unwind: "$audio" // quitar los resultados de audio del arreglo 
        }
    ]);
    return joinData
};

// Habilitar borrado logico
TrackScheme.plugin(mongooseDelete, {overrideMethods: "all "});

// (nombre coleccion, Esquema creado)
module.exports = mongoose.model("Canciones", TrackScheme);
