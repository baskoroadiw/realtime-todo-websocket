const express = require("express")
const { PrismaClient } = require("@prisma/client")

const app = express()
const prisma = new PrismaClient()

const server = require("http").createServer(app)

const ROOM_TODO = "todo-room"

// Init Socket.io
const socketIo = require("socket.io")

const io = socketIo(server, {
    cors: {
        origin: ["http://localhost:5173"],
        methods: ["GET", "POST"],
    },
})

io.on("connection", (socket) => {
    console.log("client connected: ", socket.id)

    socket.join(ROOM_TODO)

    socket.on("disconnect", (reason) => {
        console.log(reason)
    })
})
// Init Socket.io

// Send time to client
setInterval(() => {
    io.to(ROOM_TODO).emit("time", new Date().toISOString())
}, 1000)

async function getData() {
    const todo = await prisma.Todo.findMany()

    return todo
}

async function addTodo(data) {
    const todo = await prisma.Todo.create({
        data: {
            title: data,
        },
    })

    return todo
}

async function deleteTodo(id) {
    const deleteTodo = await prisma.Todo.deleteMany({
        where: {
            id: {
                equals: id,
            },
        },
    })

    return deleteTodo
}

// Handle event from client
io.on("connection", (socket) => {
    socket.on("getTodo", () => {
        getData().then((data) => {
            io.to(ROOM_TODO).emit("listTodo", data)
        })
    })

    socket.on("addTodo", (data, callback) => {
        addTodo(data).then((x) => {
            callback(x)
        })
    })

    socket.on("deleteTodo", (id, callback) => {
        deleteTodo(id).then((x) => {
            callback(x)
        })
    })
})

app.get("/", (req, res) => {
    res.send("Server Running...!")
})

const port = 3000
server.listen(port, (err) => {
    if (err) console.log(err)
    console.log(`Server listening on port ${port}`)
})
