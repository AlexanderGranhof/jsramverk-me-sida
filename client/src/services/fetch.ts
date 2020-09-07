const host = `${window.location.protocol}//${window.location.hostname}:3001`

export default (path = '', body?: Record<string, any>) => {
    const url = path.startsWith('/') ? host + path : `${host}/${path}`
    const headers = body ? { 'Content-Type': 'application/json' } : undefined

    console.log(body)

    return fetch(url, {
        method: body ? 'POST' : 'GET',
        credentials: 'include',
        body: body ? JSON.stringify(body) : undefined,
        headers,
    })
}
