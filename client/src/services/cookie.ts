import apiFetch from './fetch'

export const validate = async () => {
    return (await apiFetch('validate/cookie')).status === 200
}
