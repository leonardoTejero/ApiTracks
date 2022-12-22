const { matchedData } = require("express-validator");
const { tokenSing } = require("../utils/handleJwt");
const { encrypt, compare } = require("../utils/handlePassword");
const { handleHttpError } = require("../utils/handleError");
const { userModel } = require("../models");
const e = require("express");

const register = async (req, res) => {
    try {
        req = matchedData(req);
        const existUser = await userModel.find({email: req.email});
        if(existUser.length !== 0){
           return handleHttpError(res, "El correo ya fue usado intente con otro. ", 403);
        } 
        // Limpiar el req de datos basura o inecesarios
        const password = await encrypt(req.password);
        // Del objeto req, sobreescriba la propiedad password con la encriptacion de la misma en la line de arriba
        const body = { ...req, password };
        const dataUser = await userModel.create(body);
        // Establece el password con undefined, y quita la estricticidad del modelo para que no lo requiera
        dataUser.set("password", undefined, { strict: false });
    
        // Generar token
        const data = {
            token: await tokenSing(dataUser),
            user: dataUser
        };
    
        res.send({data})
    } catch (e) {
        handleHttpError(res, "Ocurrio un error al registrarse. "+ e.message, 403);
    }
};

const login = async (req, res) => {
    try {
        req = matchedData(req);
        // select es un filtro para poder retornar la password que no deberia retornar segun el modelo
        const user = await userModel.findOne({email: req.email}).select("password name email role");
        if(!user){
            handleHttpError(res, "El usuario no existe", 404);
            return
        }

        const hashPassword = user.password;
        const check = await compare(req.password, hashPassword);

        if(!check){
            handleHttpError(res, "Contraseña Incorrecta", 401);
            return
        }
        // Volver a proteger la password para que no se envie en la respuesta
        user.set("password", undefined, {strict: false});

        const data = {
            token: await tokenSing(user),
            user
        }
        res.send({data});

    } catch (error) {
        handleHttpError(res, "Ocurrio un error al iniciar sesion");
    }
};

module.exports = { register, login };

