import { domain as testDomain } from '../test-settings'

const isProduction = window.location.hostname !== 'localhost'

const hostname = window.location.hostname
const protocol = window.location.protocol
const subdomain = isProduction ? 'me-api.' : ''
const port = isProduction ? (window.location.port ? ':' + window.location.port : '') : ':3001'

console.log(testDomain)

const host = testDomain ? testDomain : `${protocol}//${subdomain}${hostname}${port}`

console.log(host)

export default (path = '', body?: Record<string, any>) => {
    const url = path.startsWith('/') ? host + path : `${host}/${path}`
    const headers = body ? { 'Content-Type': 'application/json' } : undefined

    console.log(url)

    return fetch(url, {
        method: body ? 'POST' : 'GET',
        credentials: 'include',
        body: body ? JSON.stringify(body) : undefined,
        headers,
    })
}
