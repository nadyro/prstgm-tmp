const socketIo = require('socket.io');
module.exports = function(server, opt) {
  const io = socketIo.listen(server);

  io.on('connection', function (socket) {
    socket.emit('init', {
      message: 'Sockets are listening.'
    });
    socket.on('simpleMessage', function(response){
      console.log(response);
      socket.emit('msgReceived', response)
    });
  });
};
