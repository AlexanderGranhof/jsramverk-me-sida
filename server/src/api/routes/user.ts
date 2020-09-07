import { Router } from 'express'
import { wrapAsync } from '../middleware/async'
import { UserSchema } from '../../models/user'
import * as User from '../../services/user'

const router = Router()

router.post(
    '/register',
    wrapAsync(async (req, res) => {
        const user = await UserSchema.validateAsync(req.body)

        await User.create(user)
        const userDBObject = await User.validate(user)

        if (!req.session) {
            return res.status(500).send('undefined session')
        }

        req.session.user = userDBObject

        res.status(201).json(user)
    }),
)

router.post(
    '/login',
    wrapAsync(async (req, res) => {
        console.log(req.session)
        const user = await UserSchema.validateAsync(req.body)
        const userDBObject = await User.validate(user)

        if (!userDBObject) {
            return res.sendStatus(401)
        }

        if (!req.session) {
            return res.status(500).send('undefined session')
        }

        req.session.user = userDBObject

        return res.status(200).json(user)
    }),
)

router.post('/logout', (req, res) => {
    if (!req.session) {
        return res.status(500).send('undefined session')
    }

    req.session.destroy((err) => {
        return res.status(err ? 500 : 200).send(err ? err : 'ok')
    })
})

export default router
