import { Router } from 'express'
import { wrapAsync } from '../middleware/async'
import * as Report from '../../services/report'
import { HttpBadRequest } from '../../errors/http'
import { ReportSchema, IncomingReportModel } from '../../models/report'
import { authenticate } from '../middleware/auth'

const router = Router()

router.post(
    '/reports',
    authenticate,
    wrapAsync(async (req, res) => {
        const report: IncomingReportModel = await ReportSchema.validateAsync(req.body)

        await Report.create(req.session?.user, req.body)
        const createdReport = await Report.week(report.week)

        return res.json(createdReport)
    }),
)

router.get(
    '/reports/week/:weekNumber',
    wrapAsync(async (req, res) => {
        const week = parseInt(req.params.weekNumber)

        if (isNaN(week)) {
            throw new HttpBadRequest(`invalid week number '${req.params.weekNumber}'`)
        }

        const report = await Report.week(week)

        if (!report) {
            return res.sendStatus(404)
        }

        return res.json(report)
    }),
)

export default router
