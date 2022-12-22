
const express = require("express");
const multer = require("multer");
const uploadMiddleware = require("../utils/handleStorage");
const { createItem, getItems, getItem, updateItem, deleteItem} = require("../controllers/storage");
const { validatorGetItem } = require("../validators/storage");
const { authMiddleware } = require("../middleware/session");
const { checkRol } = require("../middleware/rol");


const { validateFileSize } = require("../middleware/uploadFile");

const router = express.Router();


router.post("/", authMiddleware, checkRol(["admin"]), uploadMiddleware, validateFileSize, createItem); //.single("myFile")
router.get("/", authMiddleware, getItems);
router.get("/:id", authMiddleware, validatorGetItem, getItem);
router.put("/:id", authMiddleware, checkRol(["admin"]), updateItem); 
router.delete("/:id", authMiddleware, checkRol(["admin"]), deleteItem); 


module.exports = router;