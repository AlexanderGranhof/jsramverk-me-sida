import db from './db'
import { Message } from '../models/chat'

const chat = () => db('chat')

export const all = () => {
    return chat().select('*')
}

export const create = (message: Message) => {
    return chat().insert(message)
}
