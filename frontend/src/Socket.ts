import { io, Socket } from "socket.io-client"

interface todo {
    id: number
    title: string
}

interface ServerToClientEvents {
    time: (a: string) => void
    listTodo: (list: [todo]) => void
}

interface ClientToServerEvents {
    addTodo: (activity: string, callback: (x:todo) => void) => void
    getTodo: () => void
}

const URL = "http://localhost:3000"

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> =
    io(URL)
