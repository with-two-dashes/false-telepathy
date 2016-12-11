console.log("Client.js Loaded! :-)");
var socket = io();

//   $('form').submit(function(){
//     socket.emit('chat message', $('#m').val());
//     $('#m').val('');
//     return false;
//   });

socket.on("echo from server", function(msg){
	console.log("Pong", msg);
	console.timeEnd("Server Roundtrip");
	var timeReceivedAgain = new Date().getTime();
	var timeSentFromBrowser = msg.browserSentTime;
	var timeReceivedOnServer = msg.received;

	var timeObj = {
		timeGoingUp: timeReceivedOnServer - timeSentFromBrowser,
		timeFallingDown: timeReceivedAgain - timeReceivedOnServer,
		totalTime: timeReceivedAgain - timeSentFromBrowser,
	}

	var Roundtrip = timeReceivedAgain - msg.browserSentTime;

	console.table([msg]);
	document.write(Roundtrip);
});

setTimeout(function() {
	socket.emit("echo from browser", {browserSentTime: new Date().getTime() });
	console.time("Server Roundtrip");
	console.log("Ping!")
}, 1000);