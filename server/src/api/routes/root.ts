import { Router } from 'express'
import { wrapAsync } from '../middleware/async'
import * as Report from '../../services/report'

const router = Router()

router.get(
    '/',
    wrapAsync(async (req, res) => {
        return res.json(await Report.week(0))
    }),
)

export default router
