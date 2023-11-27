const express = require("express");
const router = express.Router();

module.exports = function (database) {
  router.get("/api", async (req, res) => {
    try {
      console.log(database);
      const collection = await database
        .collection("history")
        .find({ from: "573148315889" })
        .toArray();
      res.json(collection);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al obtener datos de la base de datos" });
    }
  });

  return router;
};
