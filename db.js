const { MongoClient, ServerApiVersion } = require('mongodb'); 
require('dotenv').config();
const uri = process.env.MONGODB_URI;
let col;
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("Hicimos ping con la página.¡Estamos conectados a MongoDB!");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    } finally {
        await client.close();
    }
}

run().catch(console.dir);

function getCollection() {
    if (!col) {
        throw new Error("La colección no está inicializada. Llama a connectDB primero.");
    }
    return col;
}

module.exports = { run, getCollection };