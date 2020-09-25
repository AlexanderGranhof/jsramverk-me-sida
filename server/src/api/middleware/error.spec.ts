import { HttpErrorHandler, JoiErrorHandler, SqliteErrorHandler } from './error'
import { HttpError } from '../../errors/http'
import { Request, Response, NextFunction } from 'express'
import { ValidationError } from 'joi'

describe('express error handler middlewares', () => {
    test('custom http error handler', () => {
        const err = new HttpError({ message: 'error', name: 'error', statusCode: 500 })

        let calledNext = false
        let statusCode = 0

        const next = () => {
            calledNext = true
            return
        }

        const res = {
            status: (stat: number) => {
                statusCode = stat

                return {
                    json: (arg: any) => {
                        return
                    },
                }
            },
        }

        HttpErrorHandler(err, {} as Request, res as Response, next as NextFunction)
        expect(calledNext).toEqual(false)
        expect(statusCode).toEqual(500)

        statusCode = 0
        calledNext = false

        HttpErrorHandler({}, {} as Request, res as Response, next as NextFunction)

        expect(statusCode).toEqual(0)
        expect(calledNext).toEqual(true)
    })

    test('joi error handler', () => {
        const err = new ValidationError('oof', 'oof', 'oof')

        let calledNext = false
        let statusCode = 0
        let sent = ''

        const next = () => {
            calledNext = true
            return
        }

        const res = {
            status: (stat: number) => {
                statusCode = stat

                return {
                    send: (txt: string) => {
                        sent = txt
                        return
                    },
                }
            },
        }

        JoiErrorHandler(err, {} as Request, res as Response, next as NextFunction)
        expect(calledNext).toEqual(false)
        expect(statusCode).toEqual(400)
        expect(sent).toEqual('oof')

        calledNext = false
        statusCode = 0
        sent = ''

        JoiErrorHandler({}, {} as Request, res as Response, next as NextFunction)
        expect(calledNext).toEqual(true)
        expect(statusCode).toEqual(0)
        expect(sent).toEqual('')
    })
})
