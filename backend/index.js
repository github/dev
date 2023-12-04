const { MongoClient } = require("mongodb");
const express = require("express");
const cors = require("cors");
const app = express();
let database;
app.use(cors());

async function connectdb() {
  try {
    const cursor = new MongoClient(
      "mongodb://edu4rd0:bTCXFm2iljZIhWik@ac-iybykae-shard-00-00.0n1viee.mongodb.net:27017,ac-iybykae-shard-00-01.0n1viee.mongodb.net:27017,ac-iybykae-shard-00-02.0n1viee.mongodb.net:27017/?replicaSet=atlas-zvlqsn-shard-0&ssl=true&authSource=admin"
    );
    database = await cursor.db("Chat-Bot");
    console.log("☑️ Conexion con bd correcta");
  } catch (error) {
    console.log(error);
  }
}

app.get("/", async (req, res) => {
  res.send("Hola");
});

app.get("/api", async (req, res) => {
  let { number } = req.query;
  if (!number) {
    return res.json({error: 'Lost params /number'});
  }else{
    if (number.includes('+')) {
      number = number.replace("+", "");
    }
  }
  const query = { from: number.trim() };
  const history = await database
    .collection("history")
    .find(query)
    .toArray();
  const accept = await database
    .collection("users")
    .find(query)
    .toArray();

  const responseData = {
    history: history,
    accept: accept,
  };
  res.json(responseData);
});

app.listen(3000, () => {
  connectdb();
  console.log("API CORRIENDO");
});
