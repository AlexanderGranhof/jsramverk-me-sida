import { ReportSchema } from './report'

describe('joi report schema', () => {
    test('schema can validate an object', () => {
        const obj = { week: 2, content: '' }
        const { value, error } = ReportSchema.validate(obj)

        expect(error).toBe(undefined)
        expect(value).toEqual(obj)
    })

    test('schema can invalidate an object', () => {
        const obj = { week: '', content: '' }
        const { error } = ReportSchema.validate(obj)

        expect(error).not.toEqual(undefined)
    })
})
