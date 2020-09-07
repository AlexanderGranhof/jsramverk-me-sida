import React, { createContext, FunctionComponent, useState } from 'react'

type AuthContextType = {
    username: string
    authenticated: boolean
}

const baseContext: AuthContextType = { username: '', authenticated: false }
const cachedString = localStorage.getItem('context.userContext')

let initialContext: AuthContextType

try {
    initialContext = cachedString === null ? baseContext : JSON.parse(cachedString)
} catch {
    initialContext = baseContext
}

const authContext = createContext<[AuthContextType?, ((data: AuthContextType) => void)?]>([])

const AuthProvider: FunctionComponent = ({ children }) => {
    const [userState, setState] = useState(initialContext)

    const setUserState = (data: AuthContextType) => {
        localStorage.setItem('context.userContext', JSON.stringify(data))

        return setState(data)
    }

    return <authContext.Provider value={[userState, setUserState]}>{children}</authContext.Provider>
}

export { authContext, AuthProvider }
