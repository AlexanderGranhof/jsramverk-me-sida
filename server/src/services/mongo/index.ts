import mongoose from 'mongoose'
import { Message } from './schemas/chat'

mongoose.set('useCreateIndex', true)

const conn = mongoose.connect(`mongodb://${process.env.MONGODB || 'localhost'}/bssf`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

export default (async () => {
    const db = await conn

    return Object.freeze({
        Message: db.model('Message', Message),
    })
})()
