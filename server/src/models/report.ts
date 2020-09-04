import joi from 'joi'

export interface IncomingReportModel {
    title: string
    content: string
}

export interface ReportModel extends IncomingReportModel {
    user_id: number
}

export default interface CreatedReportModel extends ReportModel {
    id: number
}

export const ReportSchema = joi.object({
    title: joi.string().required(),
    content: joi.string().required(),
    user_id: joi.number().required(),
})
