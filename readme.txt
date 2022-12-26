Informacion sobre la construccion de la api

El nombre de los archivos sera el usado para crear las rutas dinamicas
Un usuario puede tener varios roles
El usurario puede registrarce y estar dentro de la aplicacion de una vez sin tener que hacer otra peticion de login

El controlador de tracks encargado unicamente de los datos de las canciones y 
esta enlazado con el id generado al subir un archivo en el controlador de
storage

Crea la base de datos cuando es ejecutado la primera vez

Borrado logico y no fisico con la dependencia mongoose-delete, permanece la data en la bd pero tiene propiedad 
de eliminado true o false y al obtner por el controlador los false no aparecen, com si no existiesen

uso de base de datos diferente para las pruebas con switch en app.js

*** Dependencias

Multer = middleware para la carga de archivos

