require('dotenv').config();
const { MongoClient } = require("mongodb");
const path = require("path");
const express = require("express");
const app = express();
const uri = process.env.MONGODB_URI;
const dbName = "arcDb";
const collectionName = "portContactos";
const endPoint = "/user";
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));

let col;

app.use(express.json());

async function connectToDb() {
  const client = new MongoClient(uri);
  await client.connect();
  col = client.db(dbName).collection(collectionName);
}

connectToDb().catch(console.error);

app.get("/", (req, res) => res.send("La API está ejecutando"));

app.route(endPoint)
  .get(async (req, res) => {
    try {
      const documents = await col.find().toArray();
      res.json(documents);
    } catch (error) {
      res.status(500).json({ error: "Error obteniendo datos" });
    }
  })
  .post(async (req, res) => {
    try {
      await col.insertOne(req.body);
      res.status(201).json(req.body);
    } catch (error) {
      res.status(500).json({ error: "Error creando usuario" });
    }
  });

app.route(endPoint + "/:name")
  .get(async (req, res) => {
    try {
      const document = await col.findOne({ userName: req.params.name });
      res.json(document);
    } catch (error) {
      res.status(500).json({ error: "Error obteniendo datos por nombre" });
    }
  })
  .delete(async (req, res) => {
    try {
      const result = await col.deleteMany({ uNombre: req.params.name });
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: "Error eliminando usuario" });
    }
  });

app.get(endPoint + "/role/:rol", async (req, res) => {
  try {
    const documents = await col.find({ role: req.params.rol }).toArray();
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: "Error obteniendo usuarios por rol" });
  }
});

app.listen(port, () => {
  console.log(`Desplegando en la ruta http://localhost:${port}`);
});