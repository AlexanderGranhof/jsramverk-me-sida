import db from './db'
import { IncomingReportModel } from '../models/report'
import { CreatedUserModel } from '../models/user'

const reports = () => db('reports')

export const all = () => {
    return reports().select('*')
}

export const week = (week: string | number) => {
    return reports().where({ week }).first()
}

export const create = (user: CreatedUserModel, report: IncomingReportModel) => {
    return reports().insert({ ...report, user_id: user.id })
}
