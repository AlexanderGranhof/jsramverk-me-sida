import { fetch } from './__util__'

describe('root router', () => {
    test('fetching report', async () => {
        const response = await fetch('/')

        const data = await response.json()

        expect(data).toBeInstanceOf(Object)

        expect(typeof data.id).toBe('number')
        expect(typeof data.week).toBe('number')
        expect(typeof data.content).toBe('string')
        expect(typeof data.user_id).toBe('string')
    })
})
