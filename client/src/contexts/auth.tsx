import React, { createContext, FunctionComponent, useState } from 'react'

const baseContext = { username: '', authenticated: false }
const cachedString = localStorage.getItem('context.userContext')

let initialContext: any

try {
    initialContext = cachedString === null ? baseContext : JSON.parse(cachedString)
} catch {
    initialContext = baseContext
}

const authContext = createContext<any[]>([])

const AuthProvider: FunctionComponent = ({ children }) => {
    const [userState, setState] = useState(initialContext)

    const setUserState = (data: Record<string, unknown>) => {
        localStorage.setItem('context.userContext', JSON.stringify(data))

        return setState(data)
    }

    return <authContext.Provider value={[userState, setUserState]}>{children}</authContext.Provider>
}

export { authContext as userContext, AuthProvider as UserProvider }
