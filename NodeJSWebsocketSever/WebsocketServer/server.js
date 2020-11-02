"use strict";
// Optional. You will see this name in eg. 'ps' or 'top' command
process.title = 'node-chat';
// Port where we'll run the websocket server
var webSocketsServerPort = 1337;
// websocket and http servers
var webSocketServer = require('websocket').server;
var http = require('http');
var bTurnByHand1 = 1;
var bTurnByHand2 = 1;
/**
 * Global variables
 */
// latest 100 messages
var history = [ ];
// list of currently connected clients (users)
var clients = [ ];

/**
 * Helper function for escaping input strings
 */
function htmlEntities(str) {
  return String(str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
// Array with some colors
var colors = [ 'red', 'green', 'blue', 'magenta', 'purple', 'plum', 'orange' ];
// ... in random order
colors.sort(function(a,b) { return Math.random() > 0.5; } );
/**
 * HTTP server
 */
var server = http.createServer(function(request, response) {
  // Not important for us. We're writing WebSocket server,
  // not HTTP server
});
server.listen(webSocketsServerPort, function() {
  console.log((new Date()) + " Server is listening on port "
      + webSocketsServerPort);
});
/**
 * WebSocket server
 */
var wsServer = new webSocketServer({
  // WebSocket server is tied to a HTTP server. WebSocket
  // request is just an enhanced HTTP request. For more info
  // http://tools.ietf.org/html/rfc6455#page-6
  httpServer: server
});
// This callback function is called every time someone
// tries to connect to the WebSocket server
wsServer.on('request', function(request) {
  //console.log((new Date()) + ' Connection from origin '
    //  + request.origin + '.');
  // accept connection - you should check 'request.origin' to
  // make sure that client is connecting from your website
  // (http://en.wikipedia.org/wiki/Same_origin_policy)
  var connection = request.accept(null, request.origin);
  // we need to know client index to remove them on 'close' event
  var index = clients.push(connection) - 1;
  var userName = false;
  var userColor = false;
  var i = 1;
  var json = null;

  //console.log((new Date()) + ' Connection accepted.');
  // send back chat history
//  if (history.length > 0) {
//connection.sendUTF(
      //  JSON.stringify({ type: 'history', data: history} ));
  //}
  // user sent some message
  connection.on('message', function(message) {
    //console.log(message.utf8Data);

    json = JSON.parse(message.utf8Data);
    //console.log(message.utf8Data);
      var senddata = "";
      var bisOn2 = 0;
    //den 1
      var bisOn1 = 0;
    for(var j = 0 ; j < json.length;j++)
    {
      if(json[j].id == '52364E1C'  )
      {
        if(json[j].humi <= 40)
        {
          senddata = senddata + "OnH2";
        }
       if(json[j].humi >= 55 ){
           senddata = senddata + "OffH2";
        }
      }
      if(json[j].id == '52364E1B'  )
      {
        if(json[j].humi <= 40)
        {
          senddata = senddata + "OnH1";
        }
        if(json[j].humi >= 55 ){
          senddata = senddata + "OffH1";
        }
      }


      if(json[j].id == '5218427A'  )
      {
        if(json[j].temp <= 21)
        {
          senddata = senddata + "OnL2";
        }
        if(json[j].humi >= 60 | json[j].humi <= 45){

            senddata = senddata + "OnL2";
        }
        else {
          senddata = senddata + "OffL2";
        }
      }

      if(json[j].id != '5218427A')
      {
        if (json[j].temp <= 18 | json[j].temp >= 35){
            senddata = senddata + "OnL1";
          }
        if(json[j].humi <= 35 | json[j].humi >= 75  ){
            senddata = senddata + "OnL1";
          }
          else{
            senddata = senddata + "OffL1";
          }
        }
      }
      //console.log(senddata);
    for (var i=0; i < clients.length; i++) {
        clients[i].sendUTF(senddata);
    }

  });
  // user disconnected
  connection.on('close', function(connection) {
    if (userName !== false && userColor !== false) {
      console.log((new Date()) + " Peer "
          + connection.remoteAddress + " disconnected.");
      // remove user from the list of connected clients
      clients.splice(index, 1);
      // push back user's color to be reused by another user
      colors.push(userColor);
    }
  });
});
