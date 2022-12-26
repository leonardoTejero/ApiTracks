
const express = require("express");
const uploadMiddleware = require("../utils/handleStorage");
const { createItem, getItems, getItem, updateItem, deleteItem} = require("../controllers/storage");
const { validatorGetItem } = require("../validators/storage");
const { authMiddleware } = require("../middleware/session");
const { checkRol } = require("../middleware/rol");
const { validateFileSize } = require("../middleware/uploadFile");

const router = express.Router();


/**
 * Subir un archivo al storage
 * @openapi
 * /storage:
 *      post:
 *        tags:
 *          - storage
 *        summary: "Subir un archivo"
 *        description: "Subir el archivo de la cancion"
 *        security:
 *          - bearerAuth: []
 *        requestBody:
 *          content:
 *            multipart/form-data:
 *              schema:
 *                type: object
 *                properties:
 *                  myFile:
 *                    type: string
 *                    format: binary
 *        responses:
 *          '200':
 *            description: Archivo cargado correctamente              
 */
router.post("/", authMiddleware, checkRol(["admin"]), uploadMiddleware, validateFileSize, createItem); //.single("myFile")

/**
 * Obtener todos los archivos del storage
 * @openapi
 * /storage:
 *      get:
 *        tags:
 *          - storage
 *        summary: "Obtener todos los archivos"
 *        description: "Lista de todas las canciones"
 *        security:
 *          - bearerAuth: []
 *        responses:
 *          '200':
 *            content:
 *              application/json:
 *                schema: 
 *                  type: array
 *                  items: 
 *                  $ref: '#/components/schemas/storage'               
 */
router.get("/", authMiddleware, getItems);

/**
 * Obtener un archivo por id
 * @openapi
 * /storage/{id}:
 *      get:
 *        tags:
 *          - storage
 *        summary: "Obtener un archivo especifico"
 *        description: "Lista de todas las canciones"
 *        security:
 *          - bearerAuth: []
 *        parameters:
 *            - name: id
 *              in: path
 *              description: ID del archivo buscado
 *              required: true
 *              schema:
 *                type: string
 *        responses:
 *            '200':
 *              content:
 *                application/json:
 *                  schema: 
 *                    $ref: '#/components/schemas/storage'               
 */
router.get("/:id", authMiddleware, validatorGetItem, getItem);

//! No se puede actualizar el archivo cargado
router.put("/:id", authMiddleware, checkRol(["admin"]), updateItem); 

/**
 * Eliminar un archivo por el id
 * @openapi
 * /storage/{id}:
 *      delete:
 *        tags:
 *          - storage
 *        summary: "Eliminar el archivo especificado"
 *        description: ""
 *        security:
 *          - bearerAuth: []
 *        parameters:
 *            - name: id
 *              in: path
 *              description: ID del archivo buscado
 *              required: true
 *              schema:
 *                type: string
 *        responses:
 *            '200':
 *              content:
 *                application/json:
 *                  schema: 
 *                    $ref: '#/components/schemas/storage'               
 */
router.delete("/:id", authMiddleware, checkRol(["admin"]), deleteItem); 


module.exports = router;
