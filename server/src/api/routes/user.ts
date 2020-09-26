import { Router } from 'express'
import { wrapAsync } from '../middleware/async'
import { UserSchema, UserModel } from '../../models/user'
import * as User from '../../services/user'
import { generateJWT, removeJWT } from '../../services/jwt'
import { authenticate } from '../middleware/auth'

const router = Router()

router.post(
    '/register',
    wrapAsync(async (req, res) => {
        const user: UserModel = await UserSchema.validateAsync(req.body)

        await User.create(user)
        const userDBObject = await User.get(user.username)

        generateJWT(res, userDBObject)

        res.status(201).json({ username: user.username })
    }),
)

router.post(
    '/login',
    wrapAsync(async (req, res) => {
        const user = await UserSchema.validateAsync(req.body)
        const userDBObject = await User.validate(user)

        if (!userDBObject) {
            return res.sendStatus(401)
        }

        const { password, ...rest } = userDBObject

        generateJWT(res, rest)

        return res.status(200).json({ username: user.username })
    }),
)

router.post('/logout', (req, res) => {
    removeJWT(res)

    return res.status(200).send()
})

export default router
