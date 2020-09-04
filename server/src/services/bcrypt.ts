import bcrypt from 'bcrypt'

const saltRounds = 12

export const hash = (pwd: string) => {
    return bcrypt.hash(pwd, saltRounds)
}

export const compare = (pwd: string, hash: string) => {
    return bcrypt.compare(pwd, hash)
}
