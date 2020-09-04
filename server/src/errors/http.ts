import responseCodes, { HttpResponseCodeTypes } from './constants/httpResponseCodes'

const { BAD_REQUEST, NOT_FOUND, INTERNAL_SERVER_ERROR } = responseCodes

type valueof<T> = T[keyof T]

interface HttpErrorConstructor {
    message: string
    name: string
    statusCode: valueof<HttpResponseCodeTypes>
    data?: unknown
}

export class HttpError extends Error {
    name: string
    statusCode: valueof<HttpResponseCodeTypes>
    data: unknown

    constructor({ message, name, statusCode, data }: HttpErrorConstructor) {
        super(message)

        this.name = name
        this.statusCode = statusCode
        this.data = data

        Error.captureStackTrace(this, HttpError)
    }
}

export class HttpBadRequest extends HttpError {
    constructor(message = 'Bad Request', data?: unknown) {
        super({ message, name: 'HttpBadRequest', statusCode: BAD_REQUEST, data })
    }
}

export class HttpNotFound extends HttpError {
    constructor(message = 'Not Found', data?: unknown) {
        super({ message, name: 'HttpNotFound', statusCode: NOT_FOUND, data })
    }
}

export class HttpInternalServerError extends HttpError {
    constructor(message = 'Internal server error', data?: unknown) {
        super({
            message,
            name: 'HttpInternalServerError',
            statusCode: INTERNAL_SERVER_ERROR,
            data,
        })
    }
}
