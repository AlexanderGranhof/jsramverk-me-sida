import db from './db'

const users = db('users')

export const all = () => {
    return users.select('*')
}
