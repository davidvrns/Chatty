var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

var port = process.argv[2];

connections = [];

http.listen(process.env.PORT || port,() => {
    console.clear();
    console.log('Server listening on http://localhost:'+port);
  });
  app.use("/public", express.static(__dirname + '/public'));


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    connections.push(socket)
    console.clear();
    console.log('Server listening on http://localhost:'+port);   
    console.log('Connected Users: %s', connections.length);

    socket.on('disconnect', () =>{
        connections.splice(connections.indexOf(socket),1);
        console.clear();
        console.log('Server listening on http://localhost:'+port);        
        console.log('Connected Users: %s', connections.length);
    }); 
    
    socket.on('send message', (msg) => {
      console.log('new message: ' + msg);
      io.emit('new message', msg);
    });
  });
  