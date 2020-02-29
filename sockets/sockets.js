const socketIo = require('socket.io');
const request = require('request');
const NODE_ENV = process.env.NODE_ENV;
let urlUserController;
if (NODE_ENV === 'dev')
  urlUserController = 'http://localhost:8081/api/prostagmaApi/db/getUsersById';
else
  urlUserController = 'http://prostagma.fr/api/prostagmaApi/db/getUsersById';
let storedClients = [];
let user;
let chatRequest = {};
let interval;
let roomOpened;
let roomId;

function requestFunction(url, userObject) {
  return new Promise((resolve, reject) => {
    request.post(
      {
        url: url,
        qs: userObject
      }, function (err, httpResponse, body) {
        if (err)
          reject(err);
        user = JSON.parse(body);
        resolve(user);
      });
  });
}

function addToRoom(io, socket, roomId) {
  return new Promise((resolve, reject) => {
    io.of('chat').in(roomId).clients((error, clients) => {
      if (error) {
        reject(error);
      } else {
        clients.map(c => {
          if (!storedClients.includes(c))
            storedClients.push(c);
        });
        socket.emit('clients', clients);
        chatRequest.clientIds = clients;
        resolve(chatRequest);
      }
    });
  });
}

module.exports = function (server) {
  const io = socketIo.listen(server);

  const categoriesSocketHandler = io.of('/categories');
  const chatSocketHandler = io.of('/chat');
  io.on('connection', function (socket) {
    socket.emit('init', {
      message: 'Sockets are listening.'
    });
  });
  categoriesSocketHandler.on('connection', function (socket) {
    socket.emit('initCategories', 'Connected to categories socket handler.');
    socket.on('updateCategories', function (categories) {
      socket.emit('categories', categories);
    });
  });


  chatSocketHandler.on('connection', function (socket) {
    socket.emit('initChats', 'Connected to chat socket handler');
    socket.on('disconnect', () => {
      console.log('disconnected');
      storedClients = [];
      user = {};
      chatRequest = {};
      roomOpened = '';
      clearInterval(interval);
    });
    socket.on('requestConnection', function (usersId) {
      const usersIds = usersId.split(' ');
      const promiseRequester = requestFunction(urlUserController, {id: usersIds[0]});
      const promiseRecipient = requestFunction(urlUserController, {id: usersIds[2]});
      promiseRequester.then(requester => {
        promiseRecipient.then(recipient => {
          const sm = {
            statusMessage: 'Initializing room between ' + requester.username + ' and ' + recipient.username + '.',
            nextStatusMessage: 'roomCreated'
          };
          socket.emit('initChat', sm);
          roomId = requester._id + '#' + recipient._id;
          socket.join(roomId);
          chatRequest.roomId = roomId;
          chatRequest.requester = requester;
          chatRequest.recipient = recipient;
          chatRequest.creationDate = Date.now();
          chatRequest.fulfilled = false;
        });
      });
      addToRoom(io, socket, roomId).then(chatRequest => {
        setTimeout(() => {
          chatSocketHandler.in(chatRequest.roomId).emit('roomCreated', chatRequest);
        }, 2000);
        setTimeout(() => {
          chatSocketHandler.in(chatRequest.roomId).emit('waitingRecipient', chatRequest);
        }, 3000);
      });
      interval = setInterval(() => {
        if (!chatRequest.fulfilled)
          io.of('chat').emit('fulfill', chatRequest);
        console.log('Emitting...');
      }, 5000);
    });
    socket.on('fulfilled', function (cr) {
      if (cr.recipient._id === chatRequest.recipient._id) {
        roomOpened = cr.cr.roomId;
        socket.join(roomOpened);
        chatSocketHandler.in(roomOpened).emit('welcome', cr.cr);
        console.log('fulfilling...');
        if (cr.cr.fulfilled) {
          clearInterval(interval);
        }
      }
    });
    socket.on('simpleMessage', function (response) {
      chatSocketHandler.in(roomOpened).emit('msgReceived', response);
    });
  });
};
