const server = require('http').createServer();
const path = require('path');
const url = require('url');
const fs = require('fs');
const express = require('express');
const app = express();
const PORT = 3030;

app.use(express.static(path.resolve(__dirname, 'public')));

app.get('/:filename.wasm', (req, res) => {
  const wasmFilePath = path.resolve(__dirname, `public/wasm/${req.params.filename}.wasm`);
  console.log(`wasm request ${wasmFilePath}`);

  fs.readFile(wasmFilePath, (err, data) => {
    const errMessage = `Error: ${wasmFilePath} does not found. ${JSON.stringify(err)}`;

    if (err) {
      console.log(errMessage);
      return res.status(404).send(errMessage);
    }

    return res.send(data);
  });
});

server.on('request', app);
server.listen(PORT, function () {
  console.log(`Listening on ${server.address().port}`);
});
