const express = require("express");
const { validatorRegister, validatorLogin } = require("../validators/auth");
const { register, login } = require("../controllers/auth");

const router = express.Router();


/**  Registrarse por primera vez
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
 *            description: Success
 *          '401':
 *            description: User Unauthorized
 *          '400':
 *            description: Bad Request
 *          '500':
 *            description: Server Error
 */
router.post("/register", validatorRegister, register);

/**  Iniciar sesion
 * @openapi
 * /auth/login:
 *      post:
 *        tags:
 *          - auth
 *        summary: "Iniciar sesion"
 *        description: 'Acceder a la aplicacion.
 *          {
 *              "email": "user@gmail.com",
 *              "password": 123456
 *          }'
 *        requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/authLogin"
 *        responses:
 *          '200':
 *            description: Success
 *          '401':
 *            description: User Unauthorized
 *          '400':
 *            description: Bad Request
 *          '500':
 *            description: Server Error
 */
router.post("/login", validatorLogin, login);


module.exports = router;

