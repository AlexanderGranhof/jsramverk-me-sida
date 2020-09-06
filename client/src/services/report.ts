import apiFetch from './fetch'

export const about = () => {
    return apiFetch()
}

export const week = (week: number) => {
    return apiFetch(`reports/week/${week}`)
}
