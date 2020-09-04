import { Request, Response, NextFunction } from 'express'
import { HttpError } from '../../errors/http'
import HttpResponseCodes from '../../errors/constants/httpResponseCodes'
import { ValidationError } from 'joi'

const { BAD_REQUEST } = HttpResponseCodes

export const HttpErrorHandler = (error: unknown, req: Request, res: Response, next: NextFunction) => {
    if (!(error instanceof HttpError)) {
        return next(error)
    }

    return res.status(error.statusCode).send(error.data)
}

export const JoiErrorHandler = (error: unknown, req: Request, res: Response, next: NextFunction) => {
    if (!(error instanceof ValidationError)) {
        return next(error)
    }

    return res.status(BAD_REQUEST).send(error.message)
}
