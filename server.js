// server.js
const express = require("express");
const app = express();
const port = 3000;

//ruta principal donde el navehador nos mostrara un mensaje de "Hola mundo"
app.use(express.static('public'));

//Inicia el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});