const multer = require("multer");

//! ESTABLECER LIMITE AL TAMAÑO DE LOS ARCHIVOS
const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        const pathStorage = `${__dirname}/../storage`;
        cb(null, pathStorage);
    },
    filename: function (req, file, cb) {
        const ext = file.originalname.split(".").pop();

        // const fileName = `file-${Date.now()}.${ext}`; // nombramiento anterior
        console.log(file);
        const nom = file.originalname.split(" ").shift();
        const fileName = `f-${nom}-${Date.now()}.${ext}`;
        cb(null, fileName);
    }
});

// TODO Limitar el tamaño del archivo desde el middleware
const uploadMiddleware = multer({ storage }).single("myFile"); // limits:{ fileSize: 10000000} //10MB

module.exports = uploadMiddleware;
    
