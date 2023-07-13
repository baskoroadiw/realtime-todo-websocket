import { io, Socket } from 'socket.io-client';

interface ServerToClientEvents {
    time: (a: string) => void;
    // basicEmit: (a: number, b: string, c: Buffer) => void;
    // withAck: (d: string, callback: (e: number) => void) => void;
}

interface ClientToServerEvents {
    hello: () => void;
}

const URL = 'http://localhost:3000';


export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(URL);