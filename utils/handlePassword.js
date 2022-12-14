const bcryptjs = require("bcryptjs");

// Encriptar la contraseña
const encrypt = async (passwordPlain) => {
    const hash = await bcryptjs.hash(passwordPlain, 10);
    return hash;
};
/**
 * Pasar contraseña sin encriptar y contraseña encriptada
 * @param {*} passwordPlain 
 * @param {*} hashPassword 
 * @returns 
 */
const compare = async (passwordPlain, hashPassword) => {
    return await bcryptjs.compare(passwordPlain, hashPassword);
};


module.exports = { encrypt, compare };