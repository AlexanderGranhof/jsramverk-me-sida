import { Router } from 'express'
import { wrapAsync } from '../middleware/async'
import * as User from '../../services/user'
import { authenticate } from '../middleware/auth'

const router = Router()

router.get(
    '/username/status/:username',
    wrapAsync(async (req, res) => {
        const { username } = req.params

        const user = await User.get(username)

        return res.json({
            taken: !!user,
        })
    }),
)

router.get('/validate/cookie', authenticate, (req, res) => {
    if (!!req.jwtBody) {
        return res.sendStatus(200)
    }

    return res.sendStatus(401)
})

export default router
