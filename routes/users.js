
const express = require("express");
const { authMiddleware } = require("../middleware/session");
const { checkRol } = require("../middleware/rol");
const { validatorRegister } = require("../validators/auth")
const { validatorGetItem } = require("../validators/tracks")
const { getUsers, createUser, deleteUser, getUser, updateUser } = require("../controllers/users"); 

const router = express.Router();

router.get("/", authMiddleware, checkRol(["admin"]), getUsers);
router.get("/:id", authMiddleware, validatorGetItem, getUser);
router.post("/", authMiddleware, checkRol(["admin"]), validatorRegister, createUser); 
router.put("/:id", authMiddleware, checkRol(["admin", "user"]), validatorGetItem, validatorRegister, updateUser); 
router.delete("/:id", authMiddleware, checkRol(["admin"]), validatorGetItem, deleteUser); 

module.exports = router;