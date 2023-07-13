const express = require('express');
const app = express()

const server = require('http').createServer(app);

const ROOM_TODO = 'todo-room'

// Init Socket.io
const socketIo = require('socket.io');

const io = socketIo(server, {
    cors: {
        origin: ["http://localhost:5173"],
        methods: ["GET", "POST"]
    }
})
// Init Socket.io

io.on('connection', (socket) => {
    console.log('client connected: ', socket.id)

    socket.join(ROOM_TODO)

    socket.on('disconnect', (reason) => {
        console.log(reason)
    })
})

setInterval(() => {
    io.to(ROOM_TODO).emit('time', new Date().toISOString())
}, 1000)

app.get('/', (req, res) => {
    res.send('Server Running...!')
})

const port = 3000
server.listen(port, (err) => {
    if (err) console.log(err)
    console.log(`Server listening on port ${port}`)
})