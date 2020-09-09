import apiFetch from './fetch'

export const taken = (username: string) => {
    return apiFetch(`username/status/${username}`)
}

export const create = (username: string, password: string) => {
    return apiFetch(`register`, {
        username,
        password,
    })
}

export const login = (username: string, password: string) => {
    return apiFetch('login', {
        username,
        password,
    })
}

export const validate = () => {
    return apiFetch('validate/cookie')
}

export const logout = () => {
    return apiFetch('logout', {})
}
