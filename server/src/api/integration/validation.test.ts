import { fetch, signIn, domain } from './__util__'
import nodeFetch from 'node-fetch'

describe('validation router', () => {
    test('can validate cookie', async () => {
        const token = await signIn()

        const response = await nodeFetch(domain + '/validate/cookie', {
            headers: {
                Cookie: 'token=' + token || '',
            },
        })

        expect(response.status).toBe(200)
    })

    test('can get avaliability of a username', async () => {
        const takenResponse = await fetch('/username/status/admin')
        const notTakenResponse = await fetch('/username/status/' + Math.random())

        const takenData = await takenResponse.json()
        const notTakenData = await notTakenResponse.json()

        expect(takenData.taken).toBe(true)
        expect(notTakenData.taken).toBe(false)
    })
})
