import { Request, Response, NextFunction } from 'express'
import { HttpError } from '../../errors/http'
import HttpResponseCodes from '../../errors/constants/httpResponseCodes'
import { ValidationError } from 'joi'

const { BAD_REQUEST } = HttpResponseCodes

export const HttpErrorHandler = (error: unknown, req: Request, res: Response, next: NextFunction) => {
    if (!(error instanceof HttpError)) {
        return next(error)
    }

    return res.status(error.statusCode).json({ message: error.message, data: error.data })
}

export const JoiErrorHandler = (error: unknown, req: Request, res: Response, next: NextFunction) => {
    if (!(error instanceof ValidationError)) {
        return next(error)
    }

    return res.status(BAD_REQUEST).send(error.message)
}

// This is temporary for sqlite 'UNIQUE' errors
export const SqliteErrorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
    if (!error?.code?.startsWith('SQLITE')) {
        return next(error)
    }

    const SqliteErrorCode = error.code

    const MATCH_TABLE_COLUMN = new RegExp(`${SqliteErrorCode}:.*:[^(.*?)\.]*\.(.*)`)
    const MATCH_SQLITE_ERROR = new RegExp(`${SqliteErrorCode}: *(.*):`)

    const column = error.message.match(MATCH_TABLE_COLUMN)[1]
    const message = error.message.match(MATCH_SQLITE_ERROR)[1]

    return res.status(BAD_REQUEST).send(`${message} for '${column}'`)
}
