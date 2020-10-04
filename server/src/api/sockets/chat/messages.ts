import { Socket, Server } from 'socket.io'
import { Message, messageSchema } from '../../../models/chat'
import * as Chat from '../../../services/chat'

export default (io: Server, socket: Socket) => {
    socket.on('message', (message: Message) => {
        console.log('got message', message)
        const { error } = messageSchema.validate(message)

        if (error) {
            return socket.emit('error', 'message is invalid')
        }

        Chat.create(message).then(() => {
            io.emit('client_message', message)
        })
    })

    socket.on('GET:stored_messages', (cb: (messages: Message[]) => void) => {
        Chat.all().then(cb)
    })
}
