const { MongoClient } = require("mongodb");
const express = require("express");
const jwt = require('jsonwebtoken');
const cors = require("cors");
const app = express();
let database;
require('dotenv').config();

function authenticateToken(req, res, next) {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  if (token == process.env.JWT_SECRET) {
    next();
  };
}

// Use Express
app.use(cors());
app.use(express.json());

async function connectdb() {
  try {
    const cursor = new MongoClient(
      process.env.BD_URI
    );
    database = await cursor.db("Chat-Bot");
    console.log("☑️ Conexion con bd correcta");
  } catch (error) {
    console.log(error);
  }
}

app.get("/api/history", authenticateToken, async (req, res) => {
  let { number } = req.query;
  if (!number) {
    return res.json({ error: 'Lost params /number' });
  } else {
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