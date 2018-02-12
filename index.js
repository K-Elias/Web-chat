const express = require('express');
const socket = require('socket.io');

// App setup
const port = 4000;
const app = express();
const server = app.listen(port, '127.0.0.1', () => {
  console.log(`Go on http://127.0.0.1:${port}`);
});

// Middleware
app.use(express.static('public'));

const io = socket(server);
io.on('connection', (socket) => {
  console.log('Made socket connection');

  socket.on('chat', (data) => {
    io.sockets.emit('chat', data);
  });
  socket.on('typing', (data) => {
    socket.broadcast.emit('typing', data);
  });
  socket.on('no_write', (data) => {
    socket.broadcast.emit('no_write', data);
  });
});
