import { fetch, signIn, domain } from './__util__'
import nodeFetch from 'node-fetch'

describe('report router', () => {
    test('can get a report', async () => {
        const response = await fetch('/reports/week/0')
        const data = await response.json()

        expect(typeof data.id).toBe('number')
        expect(typeof data.week).toBe('number')
        expect(typeof data.content).toBe('string')
        expect(typeof data.user_id).toBe('string')
    })

    test('can get all reports', async () => {
        const response = await fetch('/reports')
        const data = await response.json()

        expect(Array.isArray(data)).toBe(true)

        expect(typeof data[0].id).toBe('number')
        expect(typeof data[0].week).toBe('number')
        expect(typeof data[0].content).toBe('string')
        expect(typeof data[0].user_id).toBe('string')
    })

    test('can create a report', async () => {
        const token = await signIn()
        const cookie = 'token=' + token || ''

        const response = await nodeFetch(domain + '/reports', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Cookie: cookie,
            },
            body: JSON.stringify({
                week: 10,
                content: '<h1>test</h1>',
            }),
        })

        const data = await response.json()

        expect(typeof data.id).toBe('number')
        expect(typeof data.week).toBe('number')
        expect(typeof data.content).toBe('string')
        expect(typeof data.user_id).toBe('string')
    })
})
