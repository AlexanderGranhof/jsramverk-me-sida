import db from './db'
import { Message } from '../models/chat'
import mongo from './mongo'

const chat = () => db('chat')

export const all = async () => {
    try {
        return (await mongo).Message.find()
    } catch (err) {
        console.error(err)
        return chat().select('*')
    }
}

export const create = async (message: Message) => {
    try {
        return new (await mongo).Message({ ...message }).save()
    } catch (err) {
        console.error(err)
        return chat().insert(message)
    }
}
