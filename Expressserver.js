const express = require('express');
const app = express();
const http = require('http').createServer(app);

const port = 3000;

http.listen(port, () => {
    console.log("Listening on port 3000");
});

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

//socket

const io = require('socket.io')(http);//socket server will know that on which server it has to work so we wrpte http

io.on('connection', (socket) => {
    console.log("connected");

    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg);
    })
})