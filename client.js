const readline = require('readline');
const socketio = require('socket.io-client');

let nick;
const socket = socketio.connect('http://localhost:4000');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('enter ur name bruh:', name => {
  nick = name;
  const msg = nick + 'joined the chat fam';
  socket.emit('send', {type: 'notice', message: msg});
  rl.prompt(true);
});

rl.on('line', line => {
  socket.emit('send', {type: 'chat', message: line, nick: nick});
  rl.prompt(true);
})

socket.on('message', data => {
  if (data.type === 'chat' && data.nick != nick) {
    console.log(data.nick + ': ' + data.message);
  }
  else if (data.type === 'notice') {
    console.log('NOTICE:' + data.message);
  }
})