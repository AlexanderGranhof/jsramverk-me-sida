import path from 'path'
import crypto from 'crypto'
import fs from 'fs'

const defaultEnvPath = path.resolve(__dirname, '../../.env')
const sessionKey = 'SESSION_SECRET'

export const createIfNotExists = (path?: string) => {
    const envPath = path ?? defaultEnvPath

    try {
        const env = fs.readFileSync(envPath, 'utf-8')
        const MATCH_SESSION_KEY = new RegExp(`${sessionKey}=`)

        const hasSecret = MATCH_SESSION_KEY.exec(env) !== null

        if (!hasSecret) {
            const secret = crypto.randomBytes(64).toString('hex')
            const newLine = env.endsWith('\n') ? '' : '\n'

            const newEnv = `${env}${newLine}${sessionKey}=${secret}\n`

            fs.writeFileSync(envPath, newEnv, { encoding: 'utf-8' })
        }
    } catch (e) {
        const secret = crypto.randomBytes(64).toString('hex')
        const newEnv = `${sessionKey}=${secret}\n`

        fs.writeFileSync(envPath, newEnv, { encoding: 'utf-8' })
    }
}
