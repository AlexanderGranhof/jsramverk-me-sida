import joi from 'joi'

export interface IncomingReportModel {
    title: string
    content: string
    week: number
}

export interface ReportModel extends IncomingReportModel {
    user_id: number
}

export default interface CreatedReportModel extends ReportModel {
    id: number
}

export const ReportSchema = joi.object({
    // title: joi.string().required(),
    week: joi.number().required(),
    content: joi.string().required().allow(''),
    // user_id: joi.number().required(),
})
