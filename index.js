const express = require('express');
const app = express();
const server = require('http').createServer(app);
const WebSocket = require('ws');
const wss = new WebSocket.Server({server:server});

wss.on('connection', function connection(ws){
    console.log('A new client connected');
    ws.send('Welcome new Client!');
    ws.on('Message', function incoming(message){
        console.log('Received: %s', message);
        ws.send('Message received %s', message)
    });

});
app.use(express.static('public'))

app.get('/',(req, res) => res.sendFile('public/index.html'));

server.listen(3000, () => console.log('Listening on port: 3000'));
