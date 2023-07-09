console.log('HI.....')
// import {io} from 'socket.io-client';
const socket = io('http://localhost:4800');
socket.on('connect', (stream)=>{
    console.log('Connected...', socket)
})