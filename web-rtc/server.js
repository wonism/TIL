const server = require('http').createServer();
const url = require('url');
const WebSocketServer = require('ws').Server;
const wss = new WebSocketServer({ server: server });
const express = require('express');
const app = express();
const PORT = 3030;

app.use(express.static('.'));
server.on('request', app);
server.listen(PORT, function () { console.log(`Listening on ${server.address().port}`); });

wss.on('connection', (ws) => {
  ws.on('message', (msg) => {
    console.log('received: %s', msg);
    wss.clients.forEach((other) => {
      if (other === ws) {
        return;
      } else {
        other.send(msg);
      }
    });
  });
});
