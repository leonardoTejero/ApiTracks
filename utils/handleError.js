
const handleHttpError = (res, message = "Ocurrio un error", code = 500) => {
    // TODO  recibir el mensage de error del catch
    res.status(code).send({ error: message });
    // res.json({ error: message, issues: "handleHttpError" });
};

module.exports = { handleHttpError };