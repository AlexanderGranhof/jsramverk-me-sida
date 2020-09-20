import { Router } from 'express'
import { wrapAsync } from '../middleware/async'
import * as Report from '../../services/report'
import { HttpBadRequest } from '../../errors/http'
import { ReportSchema, IncomingReportModel } from '../../models/report'
import { authenticate } from '../middleware/auth'
import { CreatedUserModel } from '../../models/user'

const router = Router()

router.post(
    '/reports',
    authenticate,
    wrapAsync(async (req, res) => {
        const report: IncomingReportModel = await ReportSchema.validateAsync(req.body)
        const user = req.jwtBody as CreatedUserModel

        const exists = !!(await Report.week(report.week))

        if (exists) {
            await Report.update(user, report)
            const updatedReport = await Report.week(report.week)

            return res.json(updatedReport)
        }

        await Report.create(req.jwtBody as CreatedUserModel, report)
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

router.get(
    '/reports',
    wrapAsync(async (req, res) => {
        const reports = await Report.all()

        return res.json(reports)
    }),
)

export default router
