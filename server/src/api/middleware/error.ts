import { Request, Response, NextFunction } from 'express'
import { HttpError } from '../../errors/http'

export default (error: unknown, req: Request, res: Response, next: NextFunction) => {
    if (!(error instanceof HttpError)) {
        return next(error)
    }

    return res.status(error.statusCode).send(error.data)
}
