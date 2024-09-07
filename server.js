// server.js
const express = require("express");
const app = express();
const port = 3000;

//ruta principal donde el navehador nos mostrara un mensaje de "Hola mundo"
app.get("/", (req, res) => {
    res.send("Hola mundo");
});

//Inicia el servidor
app.listen(port, () => {
    console.log('Servidor escuchando en http://localhost:${port}');
});