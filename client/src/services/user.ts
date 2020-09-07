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
