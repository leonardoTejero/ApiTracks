const { matchedData } = require("express-validator");
const { storageModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");
const config = require("dotenv").config();
const fs = require("fs");

const PUBLIC_URL = process.env.PUBLIC_URL; 
const MEDIA_PATH = `${__dirname}/../storage`;

const getItems = async (req, res) => {
  try {
    const data = await storageModel.find({});
    res.send(data);
  } catch (error) {
    handleHttpError(res, "Error al obtener los archivos almacenados");
  }
};

const getItem = async (req, res) => {
    try {
        const { id } = matchedData(req);
        const data = await storageModel.findById(id);
        res.send(data);
    } catch (error) {
        handleHttpError(res, "Error al obtener el archivo");
    }
};

const createItem = async (req, res) => {
  try {
    const { file } = req;
    const fileData = {
        fileName: file.filename,
        url: `${PUBLIC_URL}/${file.filename}`,
    };

    const data = await storageModel.create(fileData);
    res.send(data);
  } catch (error) {
    handleHttpError(res, "Error al subir el archivo");
  }
};

const updateItem = async (req, res) => {
  try {
    //! No se actualiza el archivo. En ese caso eliminar y crear uno nuevo
  } catch (error) {
    handleHttpError(res, "Error al actualizar el archivo");
  }
};

const deleteItem = async (req, res) => {
    try {
      // TODO mostrar el registro que se elimino con toda la info req.body
        const { id } = req.params;
        const data = await storageModel.findById(id);
        const filePath = `${MEDIA_PATH}/${data.fileName}`;
        
        await storageModel.deleteOne({id});
        // Eliminar el archivo de la ubicacion c:/miproyecto/storage/nombrearchivo
        fs.unlinkSync(filePath);
        const result = {
            filePath,
            deleted: true
        };

        res.send({data: result});
  } catch (error) {
    handleHttpError(res, "Error al eliminar el archivo"+ error.message);
  }
};

module.exports = { getItems, getItem, createItem, updateItem, deleteItem };
