import { UserSchema } from './user'

describe('joi report schema', () => {
    test('schema can validate an object', () => {
        const obj = { username: 'test', password: 'test' }
        const { value, error } = UserSchema.validate(obj)

        expect(error).toBe(undefined)
        expect(value).toEqual(obj)
    })

    test('schema can invalidate an object', () => {
        const obj = { username: '', password: '' }
        const { error } = UserSchema.validate(obj)

        expect(error).not.toEqual(undefined)
    })
})
