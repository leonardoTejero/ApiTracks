const { verifyToken } = require("../utils/handleJwt");
const { userModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");


// Verificar el token
const authMiddleware = async (req, res, next) => {
    try {
        
        if(!req.headers.authorization){
            return handleHttpError(res, "No se encontró el token de autenticacion", 401);
        }

        const token = req.headers.authorization.split(' ').pop();
        const dataToken = await verifyToken(token);

        if(dataToken == undefined){
            return handleHttpError(res, "El token ha expirado, debe iniciar sesion nuevamente", 403); 
        }
        if(!dataToken?._id){
            return handleHttpError(res, "Error del id del token", 401);     
        }

        // Obtener el usuario y usarlo en los controladores
        const user = await userModel.findById(dataToken._id);
        req.user = user;

        next();
    } catch (e) {
        handleHttpError(res, "Ocurrio un error al iniciar sesion"); 
    }
}

module.exports = { authMiddleware };