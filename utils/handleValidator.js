const { validationResult } = require("express-validator");

const validateResults = (req, res, next) => {
    try {
        validationResult(req).throw(); // valida los datos del request
        return next(); // si no hay error continua al controlador
    } catch (error) {
        res.status(500).json({ errores: error.array(), issues: "validate result" });
    }
};

module.exports = validateResults;