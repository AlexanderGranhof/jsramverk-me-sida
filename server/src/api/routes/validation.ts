import { Router } from 'express'
import { wrapAsync } from '../middleware/async'
import * as User from '../../services/user'

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

router.get('/validate/cookie', (req, res) => {
    if (!req.session) {
        return res.status(500).send('undefined session')
    }

    if (req.session.user) {
        return res.status(200)
    }

    return res.sendStatus(401)
})

export default router
