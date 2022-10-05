const socket = io.connect("ws://127.0.0.1:8000", {
  query:"fakoff",
  port:8000,
    reconnectionDelayMax: 100,
});
const new_socket =  io.connect("ws://127.0.0.1:8000", {
  query:"fakofffff",
  port:8000,
    reconnectionDelayMax: 100,
});
socket.read();
socket.emit('1')
socket.emit('2')
socket.emit('3')
socket.emit('4')
socket.emit('5')