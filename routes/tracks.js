// import express  from "express";

const express = require("express");
const { getItems, getItem, createItem, updateItem, deleteItem } = require("../controllers/tracks")
const { validatorCreateItem, validatorGetItem } = require("../validators/tracks");

const router = express.Router();

// se puede agregar mas de un middleware
router.get("/", getItems);
router.get("/:id", validatorGetItem, getItem);
router.post("/", validatorCreateItem, createItem); 
router.put("/:id", validatorGetItem, validatorCreateItem, updateItem); 
router.delete("/:id", validatorGetItem, deleteItem); 


// export default router;
module.exports = router;