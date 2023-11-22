const express = require('express');
const cors = require('cors');
const app = express();
const fs = require('fs');
const convertapi = require('convertapi')('X6bG0Sn0Fggs8QNP'); // Mueve la inicialización de la API aquí

app.use(cors());

let data = [];

app.get("/api/v1/data/image", async (req, res) => {
  res.json(data);
  data = [];
});

function writeFile(name, document, email, callback) {
  fs.readFile(__dirname + '/public/index.html', 'utf8', function (err, fileData) {
    if (err) {
      return callback(err);
    }
    var result = fileData.replace("name_user", name).replace("document_user", document).replace("email_user", email);

    fs.writeFile(__dirname + '/public/index.html', result, 'utf8', function (err) {
      if (err) return callback(err);
      callback(null);
    });
  });
}

app.post("/api/v1/create/image", async (req, res) => {
  data = req.query;
  const { name, document, email } = data;
  if (!name || !document || !email) {
    return res.json({ error: 'Lost params \name || \document || \email' });
  } else {
    try {
      await writeFile(name, document, email, async (err) => {
        if (err) {
          return res.json({ error: `Error writing file: ${err}` });
        }

        const result = await convertapi.convert('png', {
          File: 'public/index.html'
        }, 'html');

        const outputPath = 'public/index.png';
        await result.saveFiles(outputPath);

        const imageBuffer = fs.readFileSync(outputPath);

        res.writeHead(200, {
          'Content-Type': 'image/png',
          'Content-Length': imageBuffer.length
        });

        res.end(imageBuffer, 'binary');
      });
    } catch (error) {
      res.json({ error: `Internal server ${error}` });
    }
  }
});

app.listen(5000, () => {
  console.log("API CORRIENDO");
});
