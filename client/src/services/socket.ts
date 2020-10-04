import io from 'socket.io-client'

const isProduction = window.location.hostname !== 'localhost'

const hostname = window.location.hostname
const protocol = window.location.protocol
const subdomain = isProduction ? 'me-api.' : ''
const port = isProduction ? (window.location.port ? ':' + window.location.port : '') : ':3001'
const host = `${protocol}//${subdomain}${hostname}${port}`

export default io(host)
