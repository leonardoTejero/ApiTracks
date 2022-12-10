
const handleHttpError = (res, message = "Ocurrio un error", code = 500) => {
    res.status(code);
    res.json({ error: message, issues: "handleHttpError" });
};

module.exports = { handleHttpError };