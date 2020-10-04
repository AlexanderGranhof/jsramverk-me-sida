import { Socket, Server } from 'socket.io'

export default (io: Server, socket: Socket) => {
    socket.on('user_connect', (username: string) => {
        if (typeof username !== 'string') {
            return socket.emit('error', 'username is not a string')
        }

        socket.broadcast.emit('user_connect', {
            id: socket.id,
            username,
        })
    })

    socket.on('disconnected', () => {
        socket.broadcast.emit('user_disconnect', {
            id: socket.id,
        })
    })
}
