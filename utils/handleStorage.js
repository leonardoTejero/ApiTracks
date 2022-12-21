const multer = require("multer");

//! ESTABLECER LIMITE AL TAMAÑO DE LOS ARCHIVOS
const storage = multer.diskStorage({
    // limits: {
    //     fileSize: 10 // Sensitive: 10MB is more than the recommended limit of 8MB
    //   },
    destination: function (req, file, cb) {
        const pathStorage = `${__dirname}/../storage`;
        cb(null, pathStorage);
    },
    filename: function (req, file, cb) {
        const ext = file.originalname.split(".").pop();

        // TODO  CAMBIAR EL NOMBRAMIENTO DE LOS ARCHIVOS CON EL NOMBRE ORIGINAL 
        const fileName = `file-${Date.now()}.${ext}`;
        cb(null, fileName);
    }
});

const uploadMiddleware = multer({ storage, limits:{ fileSize: 1} }).single("myFile"); //.single("myFile")
    
module.exports = uploadMiddleware;