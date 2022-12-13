const e = require("express");
const jwt = require("jsonwebtoken");
const config = require("dotenv").config();
const { handleHttpError } = require("../utils/handleError");

const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Pasar objeto del usuario
 * @param {*} user 
 */
const tokenSing = async (user) => {
    const sign = jwt.sign(
        {
            _id: user._id, 
            role: user.role
        },
        JWT_SECRET,
        {
            expiresIn:"1h" // TODO cambiar el tiempo de expiracion
        }
    );
    return sign;
};

/**
 * Pasar el token de sesion 
 * @param {*} tokenJwt 
 * @returns 
 */
const verifyToken = async (tokenJwt) => {
    try {
        console.log("ASDFA",jwt.verify(tokenJwt, JWT_SECRET));
        return jwt.verify(tokenJwt, JWT_SECRET);
    } catch (e) {
        return console.log("Error al verificar el token ", e.message);
    }
};


module.exports = { tokenSing, verifyToken };