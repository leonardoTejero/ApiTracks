
const express = require("express");
const { getItems, getItem, createItem, updateItem, deleteItem } = require("../controllers/tracks");
const { checkRol } = require("../middleware/rol");
const { authMiddleware } = require("../middleware/session");
const { validatorCreateItem, validatorGetItem } = require("../validators/tracks");

const router = express.Router();


/**  Obtener todas las canciones 
 * @openapi
 * /tracks:
 *      get:
 *        tags:
 *          - tracks
 *        summary: "Obtener  todas las canciones"
 *        security:
 *          - bearerAuth: []
 *        responses:
 *          '200':
 *            content:
 *              application/json:
 *                schema: 
 *                  type: array
 *                  items: 
 *                  $ref: '#/components/schemas/tracks'   
 *          '401':
 *            description: User Unauthorized
 *          '400':
 *            description: Bad Request
 *          '500':
 *            description: Server Error            
 */
router.get("/", authMiddleware, getItems);

/**  Obtener una cancion por id
 * @openapi
 * /tracks/{id}:
 *      get:
 *        tags:
 *          - tracks
 *        summary: "Obtener una cancion en especifico"
 *        security:
 *          - bearerAuth: []
 *        parameters:
 *            - name: id
 *              in: path
 *              description: ID de la canción buscada
 *              required: true
 *              schema:
 *                type: string
 *        responses:
 *            '200':
 *              content:
 *                application/json:
 *                  schema: 
 *                    $ref: '#/components/schemas/tracks'       
 *            '401':
 *              description: User Unauthorized
 *            '400':
 *              description: Bad Request
 *            '500':
 *              description: Server Error        
 */
router.get("/:id", authMiddleware, validatorGetItem, getItem);

/**  Crear una cancion 
 * @openapi
 * /tracks:
 *      post:
 *        tags:
 *          - tracks
 *        summary: "Crear una cancion"
 *        security:
 *          - bearerAuth: []
 *        requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/tracks"
 *        responses:
 *          '200':
 *              description: Success    
 *          '401':
 *            description: User Unauthorized
 *          '400':
 *            description: Bad Request
 *          '500':
 *            description: Server Error 
 */
router.post("/", authMiddleware, checkRol(["admin"]), validatorCreateItem, createItem); 

/**  Actualizar una cancion 
 * @openapi
 * /tracks/{id}:
 *      put:
 *        tags:
 *          - tracks
 *        summary: "Actualizar una cancion"
 *        security:
 *          - bearerAuth: []
 *        parameters:
 *            - name: id
 *              in: path
 *              description: ID de la canción 
 *              required: true
 *              schema:
 *                type: string
 *        requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/tracks"
 *        responses:
 *            '200':
 *              description: Success
 *            '401':
 *              description: User Unauthorized
 *            '400':
 *              description: Bad Request
 *            '500':
 *              description: Server Error              
 */
router.put("/:id", authMiddleware, checkRol(["admin"]), validatorGetItem, validatorCreateItem, updateItem); 

/**  Eliminar una cancion por el id
 * @openapi
 * /tracks/{id}:
 *      delete:
 *        tags:
 *          - tracks
 *        summary: "Eliminar una canción"
 *        description: ""
 *        security:
 *          - bearerAuth: []
 *        parameters:
 *            - name: id
 *              in: path
 *              description: ID de la cancion
 *              required: true
 *              schema:
 *                type: string
 *        responses:
 *            '200':
 *              content:
 *                application/json:
 *                  schema: 
 *                    $ref: '#/components/schemas/tracks'
 *            '401':
 *              description: User Unauthorized
 *            '400':
 *              description: Bad Request
 *            '500':
 *              description: Server Error               
 */
router.delete("/:id", authMiddleware, checkRol(["admin"]), validatorGetItem, deleteItem); 


module.exports = router;