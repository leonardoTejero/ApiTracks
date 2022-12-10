const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator")

// Validar los campos de la solicitud que existan y no esten vacios
 const validatorCreateItem = [
    check("name").exists().notEmpty(), // .isLength({min:5, max:90})
    check("albun").exists().notEmpty(), 
    check("cover").exists().notEmpty(), 
    check("artist").exists().notEmpty(), 
    check("artist.name").exists().notEmpty(), 
    check("artist.nickname").exists().notEmpty(), 
    check("artist.nacionality").exists().notEmpty(), 
    check("duration").exists().notEmpty(), 
    check("duration.start").exists().notEmpty(), 
    check("duration.end").exists().notEmpty(), 
    check("mediaId").exists().notEmpty().isMongoId(), 
    (req, res, next) => {
        return validateResults(req, res, next)
    }
 ];

 const validatorGetItem = [
    check("id").exists().notEmpty().isMongoId(), 
    (req, res, next) => {
        return validateResults(req, res, next)
    }
 ];

 module.exports = { validatorCreateItem, validatorGetItem }