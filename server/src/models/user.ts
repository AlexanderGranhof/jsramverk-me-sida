import joi from 'joi'

export interface UserModel {
    username: string
    password: string
}

export interface CreatedUserModel extends UserModel {
    id: number
}

export const UserSchema = joi.object({
    username: joi.string().required(),
    password: joi.string().required(),
})
