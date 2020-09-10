const port = window.location.port
const host = `${window.location.protocol}//${window.location.hostname}${port ? ':' + port : ''}/api`

export default (path = '', body?: Record<string, any>) => {
    const url = path.startsWith('/') ? host + path : `${host}/${path}`
    const headers = body ? { 'Content-Type': 'application/json' } : undefined

    return fetch(url, {
        method: body ? 'POST' : 'GET',
        credentials: 'include',
        body: body ? JSON.stringify(body) : undefined,
        headers,
    })
}
