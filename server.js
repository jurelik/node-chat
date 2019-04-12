const readline = require('readline');
const socketio = require('socket.io');

const io = socketio.listen(4000);

io.sockets.on('connection', socket => {
  socket.on('send', data => {
    io.sockets.emit('message', data);
  })
})