
const { query } = require("express");
const e = require("express");
const { matchedData } = require("express-validator");
const { userModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");

const getUsers =  async (req, res) => {

    try {
        const data =  await userModel.find({}); 
        res.send(data);
    } catch (e) {
        // enviar el propio mensaje del error
        handleHttpError(res, "Error al obtener los usuarios. "+ e.message);
    }
};

const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await userModel.findById(id);
        if(data == null){
        return handleHttpError(res, "El usuario no existe", 404);
        }
        res.send(data);
    } catch (e) {
        handleHttpError(res, "Error al obtener el usuario. "+ e.message);
    }
};

const createUser = async (req, res) => {
    try {
        // limpia el body de propiedades incorrectas en la peticion
        req = matchedData(req);
        const body = { ...req, role: "admin" };
        await userModel.create(body);
        res.send(body);
    } catch (e) {
        handleHttpError(res, "Error al crear el usuario"+ e.message);
    }
};

const updateUser = async (req, res) => {
    try {
        // crear 2 objetos a partir de request, uno con el id y lo restante en body
        const { id, ...body} = matchedData(req);
        const user = await userModel.findById(id);
        if(user == null){
            return handleHttpError(res, "Error al actualizar. El usuario no existe");
        }

        const data = await userModel.findByIdAndUpdate( 
            id,
            {
                name: body.name,
                age: body.age,
                email: user.email,
                password: body.password
            },
            {
                returnDocument: "after" // mostrar el usuario actualizado
            }
        );
        res.send({data});
    } catch (e) {
        handleHttpError(res, "Error al actualizar el usuario. "+ e.message);
    }
};

const deleteUser = async (req, res) => {
    try {
        req = matchedData(req);
        const {id} = req;
        // deleteOne Borrado fisico
        if(!await userModel.findById(id)){
            return handleHttpError(res, "Error, el usuario que desea eliminar no existe");
        }   
        await userModel.delete({_id:id});
        res.send({result: "Usuario eliminado"});
    } catch (e) {
        handleHttpError(res, "Error al eliminar el usuario. ", e.message);
    }
};

module.exports = { getUsers, createUser, deleteUser, getUser, updateUser};