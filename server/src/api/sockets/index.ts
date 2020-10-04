import SocketIO from 'socket.io'
import initializeChat from './chat'

export default (server: Express.Application) => {
    const io = SocketIO(server)

    io.on('connection', (socket) => {
        console.log('we got connection', socket.id)
    })

    initializeChat(io)
}
