const ADDRESS = 'ws://chat.spooncast.net/';
var command = '';
var message = '';
var event = '';
var subevent = '';

var commands = ['live_join', 'live_message', 'live_like']


const socket = io(ADDRESS,{
  transports: ['websocket']
});

// on reconnection, reset the transports option, as the Websocket
// connection may have failed (caused by proxy, firewall, browser, ...)
socket.on('reconnect_attempt', () => {
  socket.io.opts.transports = ['polling', 'websocket'];
});

// Simple Send Format
socket.emit(command, message);

// Event Listener Format
 socket.on(event,(data) => {
 	socket.emit(subevent, message);
})