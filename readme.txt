Informacion sobre la construccion de la api

El nombre de los archivos sera el usado para crear las rutas dinamicas

El controlador de tracks encargado unicamente de los datos de las canciones y 
esta enlazado con el id generado al subir un archivo en el controlador de
storage

Configuracion agregada en el package.json
 "scripts": {
    "start": "node ./app.js",
    "dev": "nodemon ./app.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },

Borrado logico y no fisico con la dependencia mongoose-delete, permanece la data en la bd pero tiene propiedad 
de eliminado true o false y al obtner por el controlador los false no aparecen, com si no existiesen

*** Dependencias

Multer = middleware para la carga de archivos