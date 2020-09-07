import db from './db'
import { UserModel, CreatedUserModel } from '../models/user'
import * as bcrypt from './bcrypt'

const users = () => db('users')

export const all = () => {
    return users().select('*')
}

export const create = async (user: UserModel) => {
    const password = await bcrypt.hash(user.password)

    return users().insert({ ...user, password })
}

export const validate = async (user: UserModel) => {
    const { username, password } = user

    const foundUser: CreatedUserModel | undefined = await users().where({ username }).first()

    if (!foundUser) {
        return false
    }

    const valid = await bcrypt.compare(password, foundUser.password)

    return valid ? foundUser : false
}

export const get = async (username: string) => {
    return users().where({ username }).first()
}
