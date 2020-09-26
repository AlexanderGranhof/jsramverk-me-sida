import { fetch, extractToken } from './__util__'

const data = {
    token: '',
}

describe('user router', () => {
    test('can register and sign in', async () => {
        const username = Math.random().toString()
        const password = Math.random().toString()

        const response = await fetch('/register', {
            username,
            password,
        })

        expect(response.status).toBe(201)

        data.token = extractToken(response)

        expect(data.token).not.toBe('')

        const signInResponse = await fetch('/login', {
            username: 'admin',
            password: 'admin',
        })

        expect(signInResponse.status).toBe(200)

        data.token = extractToken(signInResponse)

        expect(data.token).not.toBe('')
    })

    test('can sign in', async () => {
        const response = await fetch('/login', {
            username: 'admin',
            password: 'admin',
        })

        expect(response.status).toBe(200)

        data.token = extractToken(response)

        expect(data.token).not.toBe('')
    })
})
