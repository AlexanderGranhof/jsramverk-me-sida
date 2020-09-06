const host = `${window.location.protocol}//${window.location.hostname}:3001`

export default (path = '', body?: Record<string, any>) => {
    const url = path.startsWith('/') ? host + path : `${host}/${path}`

    return fetch(url, {
        method: body ? 'POST' : 'GET',
        credentials: 'same-origin',
        body: body ? JSON.stringify(body) : undefined,
    })
}
