const socket = new WebSocket('ws://localhost:3000')

socket.addEventListener('open', function (event){
    socket.send('Hello from client!')
})

socket.addEventListener('message', function (event){
    console.log('Message from server ', event.data)
})

const sendMessage = () =>{
    socket.send('Hello from client 1')
}