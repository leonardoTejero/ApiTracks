
const express = require("express");
const { getItems, getItem, createItem, updateItem, deleteItem } = require("../controllers/tracks");
const { checkRol } = require("../middleware/rol");
const { authMiddleware } = require("../middleware/session");
const { validatorCreateItem, validatorGetItem } = require("../validators/tracks");

const router = express.Router();

// se puede agregar mas de un middleware
router.get("/", authMiddleware, getItems);
router.get("/:id", authMiddleware, validatorGetItem, getItem);
router.post("/", authMiddleware, checkRol(["admin"]), validatorCreateItem, createItem); 
router.put("/:id", authMiddleware, checkRol(["admin"]), validatorGetItem, validatorCreateItem, updateItem); 
router.delete("/:id", authMiddleware, checkRol(["admin"]), validatorGetItem, deleteItem); 


module.exports = router;