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

export default router
