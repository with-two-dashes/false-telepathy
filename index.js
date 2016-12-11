const express = require("express");
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const fs = require('fs');

const port = 9090;

app.use(express.static("public"));
app.use(express.static("audio"));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
app.get('/client.js', function(req, res){
  res.sendFile(__dirname + '/client.js');
});
app.get("/debug", function(req, resp){
	resp.sendFile(__dirname + "/public/debug.html");
});
app.get("/audio", function(req, resp){
	resp.json({"hello":true, "world":false});
});


var currentlyPlaying = "Nothing Over Here...";
io.on('connection', function(socket){

	TellAllWhatIsPlaying();
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on("echo from browser", function(msg){
	  console.log("ping from browser.");
	  var serverRecievedTime = new Date().getTime();
	  var newMsg = {
		  serverRecievedTime:serverRecievedTime,
		  serverSentTime: new Date().getTime(),
		  browserSentTime: msg.browserSentTime,
	  }
	  socket.emit("echo from server", newMsg);
  })
	socket.on("play request", function(playRequest){
		currentlyPlaying = playRequest;
		TellAllWhatIsPlaying();
	})
	function TellAllWhatIsPlaying(){
		socket.emit("now playing", currentlyPlaying);
		socket.broadcast.emit("now playing", currentlyPlaying);
	}
});

http.listen(port, function(){
  console.log('listening on localhost:' + port);
});