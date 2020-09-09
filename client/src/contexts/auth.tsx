import React, { createContext, FunctionComponent, useState, useEffect } from 'react'
import * as User from '../services/user'

type AuthContextType = {
    username: string
    authenticated: boolean
}

const baseContext: AuthContextType = { username: '', authenticated: false }
const cachedString = localStorage.getItem('context.auth')

let initialContext: AuthContextType

try {
    initialContext = cachedString === null ? baseContext : JSON.parse(cachedString)
} catch {
    initialContext = baseContext
}

// Its not great to initialize with an empty function, i dont know how to solve the error otherwise
const authContext = createContext<[AuthContextType, (data: AuthContextType) => void]>([
    initialContext,
    (data: AuthContextType) => {
        return
    },
])

const AuthProvider: FunctionComponent = ({ children }) => {
    const [userState, setState] = useState(initialContext)

    const verifyAuth = async () => {
        const response = await User.validate()

        setState({ ...userState, authenticated: response.status === 200 })
    }

    useEffect(() => {
        verifyAuth()
    }, [])

    const setUserState = (data: AuthContextType) => {
        localStorage.setItem('context.auth', JSON.stringify(data))

        return setState(data)
    }

    return <authContext.Provider value={[userState, setUserState]}>{children}</authContext.Provider>
}

export { authContext, AuthProvider }
