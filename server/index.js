const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const adjust = (state) => {
  return {
    x: state.x + Math.random() * 10 - 5,
    y: state.y + Math.random() * 10 - 5,
  };
};

io.on('connection', (socket) => {
  console.log('connected?');

  socket.on('state.client', (state) => {
    console.log('received state')
    const computed = adjust(state);
    // socket.emit('state.server', computed);
  });
});

server.listen(3000);
