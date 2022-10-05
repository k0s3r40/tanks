const socket = new WebSocket('ws://localhost:3000')
var map = null
socket.addEventListener('open', function (event){
    socket.send('Hello from client!')
})

socket.addEventListener('message', function (event){
    let data = event.data.toString()
    if( event.data.toString().split(':')[0] === 'MAP'){
        let map_info = []
        for (let i=0; i<data.split(',').length; i++){
            map_info.push((data.split(',')[i]).split('|'))
        }
        map = map_info
    }
    console.log('Message from server ', event.data)
})

const sendMessage = () =>{
    socket.send('Hello from client 1')
}