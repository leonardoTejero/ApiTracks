const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator")

// No necesita validador para crear el item porque ya hace uso de un middleware especializado
// en la ruta

 const validatorGetItem = [
    check("id").exists().notEmpty().isMongoId(), 
    (req, res, next) => {
        return validateResults(req, res, next)
    }
 ];

 module.exports = { validatorGetItem }