import apiFetch from './fetch'

export const about = () => {
    return apiFetch()
}

export const week = (week: number) => {
    return apiFetch(`reports/week/${week}`)
}

export const all = () => {
    return apiFetch('reports')
}

export const create = (content: string, week: number) => {
    return apiFetch('reports', {
        content,
        week,
    })
}
