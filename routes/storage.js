
const express = require("express");
const router = express.Router();
const uploadMiddleware = require("../utils/handleStorage");
const { createItem, getItems, getItem, updateItem, deleteItem} = require("../controllers/storage");
const { validatorGetItem } = require("../validators/storage");


router.post("/", uploadMiddleware.single("myFile"), createItem);
router.get("/", getItems);
router.get("/:id", validatorGetItem, getItem);
router.put("/:id", updateItem); 
router.delete("/:id", deleteItem); 


module.exports = router;