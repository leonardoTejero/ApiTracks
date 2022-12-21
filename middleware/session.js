const { verifyToken } = require("../utils/handleJwt");
const { userModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");


// Verificar el token
const authMiddleware = async (req, res, next) => {
    try {
        
        if(!req.headers.authorization){
            handleHttpError(res, "No se encontró el token de autenticacion", 401);
        return
        }

        const token = req.headers.authorization.split(' ').pop();
        const dataToken = await verifyToken(token);

        if(dataToken == undefined){
            handleHttpError(res, "El token ha expirado, debe iniciar sesion nuevamente", 403);
            return
        }
        if(!dataToken?._id){
            handleHttpError(res, "Error del id del token", 401);
            return
        }

        // Obtener el usuario y usarlo en los controladores
        const user = await userModel.findById(dataToken._id);
        req.user = user;

        next();
    } catch (e) {
        handleHttpError(res, "Ocurrio un error"); //"No ha iniciado sesion"
    }
}

module.exports = { authMiddleware };