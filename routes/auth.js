
const express = require("express");
const { validatorRegister, validatorLogin } = require("../validators/auth");
const { register, login } = require("../controllers/auth");

const router = express.Router();


router.post("/register", validatorRegister, register);
router.post("/login", validatorLogin, login);


module.exports = router;      