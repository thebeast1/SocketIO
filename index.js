const express = require('express');
const app = express();

app.use(express.static('public'));
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});



io.on('connection', (socket) => {
  console.log('a user connected');
  io.emit('chat message', `<<BOT>> HELLO: ${socket.id}`);

  socket.on('chat message', (msg) => {
    io.emit('chat message', `Server forward: ${msg}`);
  })
});
const port = process.env.PORT || 3000;

http.listen(port, () => {
  console.log('listening on *:${port}');
});
