import { Schema } from 'mongoose'

export const Message = new Schema({
    user: String,
    time: Date,
    message: String,
})
