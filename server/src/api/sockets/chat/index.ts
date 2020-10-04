import { Server } from 'socket.io'
import initializeMessages from './messages'
import initializeUsers from './users'

export default (io: Server) => {
    io.on('connect', (socket) => {
        initializeMessages(io, socket)
        initializeUsers(io, socket)
    })
}
