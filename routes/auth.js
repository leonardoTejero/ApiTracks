const express = require("express");
const { validatorRegister, validatorLogin } = require("../validators/auth");
const { register, login } = require("../controllers/auth");

const router = express.Router();

/**
 * Registrarse
 * @openapi
 * /auth/register:
 *      post:
 *        tags:
 *          - auth
 *        summary: "Registrar nuevo usuario"
 *        description: "Crear un nuevo usuarion en la aplicacion, con permisos estandar "
 *        requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/authRegister"
 *        responses:
 *          '200':
 *            description: El usuario ha sido creado exitosamente
 *          '403':
 *            description: El correo ya ha sido usado
 */
router.post("/register", validatorRegister, register);

/**
 * Iniciar sesion
 * @openapi
 * /auth/login:
 *      post:
 *        tags:
 *          - auth
 *        summary: "Iniciar sesion"
 *        description: "Acceder a la aplicacion"
 *        requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/authLogin"
 *        responses:
 *          '200':
 *            description: Inicio de sesion exitoso
 */
router.post("/login", validatorLogin, login);

module.exports = router;

