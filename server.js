'use strict';

const express = require('express');
const SocketServer = require('ws').Server;
const path = require('path');
const util = require('./util.js');

const PORT = process.env.PORT || 443;
const WEATHERSTATIONTOKEN = process.env.WEATHERSTATIONTOKEN;
const ELECTRONAPPTOKEN = process.env.ELECTRONAPPTOKEN;
const INDEX = path.join(__dirname, 'index.html');

const server = express()
  .use((req, res) => res.sendFile(INDEX) )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });

function verifyClient(info) {
    // return true
    var token = util.gup('token', info.req.url);
    return token === WEATHERSTATIONTOKEN || token === ELECTRONAPPTOKEN;
}

function heartbeat() {
    this.isAlive = true;
}

wss.on('connection', (ws) => {
  console.log('Client connected:');
//   console.log(ws);
  ws.on('close', () => console.log('Client disconnected'));
  
  ws.isAlive = true;
  ws.on('pong', heartbeat);
  ws.on('message', (data) => {
    console.log('recieved packet');
      wss.clients.forEach(socket => {
          if(socket !== ws){
              console.log('sending:');
            //   console.log(data);
              socket.send(data);
          }
      });
    //   ws.send('thx! Here it comes back' + data);
  });
});

const interval = setInterval(function ping() {
    wss.clients.forEach(function each(ws) {
        if (ws.isAlive === false) return ws.terminate();

        ws.isAlive = false;
        ws.ping('', false, true);
    });
  }, 30000);