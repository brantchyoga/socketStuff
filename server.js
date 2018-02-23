var express = require('express');
var socket = require('socket.io');
var app = express();

app.use(express.static('public'));




var server = app.listen(process.env.PORT || 3000);
//serve up my server as an in/out for my socket connection
var io = socket(server);
//this is an event listener that looks for a new connection.
//it runs for each new user that connect to the server.
io.sockets.on('connection', function(socket){
  console.log('we have new client:' + socket.id);

  //when user emites, client side: socket.emit('event', data)
  socket.on('mouse', function(data){
    // console.log('received: "mouse" '+data.x+' '+data.y);
    //send x and y to all other clients
    socket.broadcast.emit('mouse', data)
  });

  socket.on('disconnect', function(){
    console.log('client disconnected');
  });
});
