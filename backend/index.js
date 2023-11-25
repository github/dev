const { MongoClient } = require("mongodb");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors);
const path = require('path')
app.use('/static', express.static(path.join(__dirname, 'public')))
async function connectdb() {
  try {
    const cursor = new MongoClient(
      "mongodb://edu4rd0:bTCXFm2iljZIhWik@ac-iybykae-shard-00-00.0n1viee.mongodb.net:27017,ac-iybykae-shard-00-01.0n1viee.mongodb.net:27017,ac-iybykae-shard-00-02.0n1viee.mongodb.net:27017/?replicaSet=atlas-zvlqsn-shard-0&ssl=true&authSource=admin"
    );
    const database = await cursor.db("Chat-Bot")
    console.log("☑️ Conexion con bd correcta");
  } catch (error) {
    console.log(error);
  }
}

app.get('/api',async (req,res)=>{
 res.send("Hola")
})


app.get('/api',async (req,res)=>{
    const collection = await database
      .collection("history")
      .find({ from: "573148315889" })
      .toArray();
    res.json(collection)
})

app.listen(8080, () => {
  connectdb();
  console.log("API CORRIENDO");
});
