import joi from 'joi'

export type Message = {
    user: string
    time: Date
    message: string
}

export const messageSchema = joi.object({
    user: joi.string().required(),
    time: joi.date().required(),
    message: joi.string().required(),
})
