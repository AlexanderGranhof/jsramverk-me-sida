import jwt from 'jsonwebtoken'
import day from 'dayjs'
import { Response } from 'express'

const isProd = process.env.NODE_ENV === 'production'
const JWT_SECRET = process.env.JWT_SECRET || ''

if (JWT_SECRET.length < 16) {
    throw new Error("env 'JWT_SECRET' length is less than 16")
}

export const SETTINGS = {
    expireDuration: isProd
        ? 1000 * 60 * 10 // 10 min
        : 1000 * 60 * 60 * 24, // 24 hrs
    expireDate: () => day().add(SETTINGS.expireDuration, 'millisecond').toDate(),
}

export const generateJWT = (res: Response, data: Record<string, any>) => {
    const expiresIn = SETTINGS.expireDuration
    const token = jwt.sign(data, JWT_SECRET, { expiresIn })

    return res.cookie('token', token, {
        expires: SETTINGS.expireDate(),
        secure: isProd,
        httpOnly: true,
        signed: true,
    })
}

export const removeJWT = (res: Response) => {
    res.clearCookie('token')
}
