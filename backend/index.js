const { MongoClient } = require("mongodb");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());

let database; // Variable para almacenar la conexión a la base de datos

async function connectdb() {
  try {
    const client = new MongoClient(
      "mongodb://edu4rd0:bTCXFm2iljZIhWik@ac-iybykae-shard-00-00.0n1viee.mongodb.net:27017,ac-iybykae-shard-00-01.0n1viee.mongodb.net:27017,ac-iybykae-shard-00-02.0n1viee.mongodb.net:27017/?replicaSet=atlas-zvlqsn-shard-0&ssl=true&authSource=admin"
    );
    await client.connect();
    database = client.db("Chat-Bot");
    console.log("☑️ Conexion con bd correcta");

    // Luego de conectar la base de datos, inicia el servidor
    app.listen(3000, () => {
      console.log("API CORRIENDO");
    });
  } catch (error) {
    console.error(error);
  }
}

// Importa las rutas después de establecer la conexión a la base de datos
connectdb().then(() => {
  app.use(require("./routes/reques_num")(database));
});
