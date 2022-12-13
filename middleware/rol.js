const { handleHttpError } = require("../utils/handleError");

/**
 * Arreglo con los roles permitidos
 * @param {*} roles
 * @returns 
 */
const checkRol = (roles) => (req, res, next) => {
    try {
        const {user} = req; 
        const rolesByUser = user.role;
        // Si el arreglo de roles contiene el que tiene el usuario, Retorna true o false
        const checkValueRole = roles.some((roleSingle) => rolesByUser.includes(roleSingle));

        if(!checkValueRole){
            handleHttpError(res, "No tiene los permisos necesarios para realizar esta operacion, contacte con un administrador", 403);
        }
        next();
    } catch (error) {
        handleHttpError(res, "Ocurrio un error con los permisos", 403);
    }
}

module.exports = { checkRol };