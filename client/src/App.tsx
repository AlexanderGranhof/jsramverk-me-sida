import React, { FunctionComponent, useState } from 'react'
import styles from './App.module.scss'
import { UserProvider } from './contexts/auth'
import { BrowserRouter as Router } from 'react-router-dom'

import Nav from './components/nav/nav'
import TopNav from './components/nav/top/top'

import Main from './views/main/main'
import Register from './components/register/register'
import SignIn from './components/signin/signin'

const App: FunctionComponent = () => {
    const [showRegister, setShowRegister] = useState(false)
    const [showSignIn, setShowSignIn] = useState(true)

    const handleMenuClick = (item: string) => {
        if (item === 'register') {
            return setShowRegister(true)
        }

        if (item === 'sign in') {
            return setShowSignIn(true)
        }
    }

    return (
        <div className={styles['container']}>
            <Router>
                <UserProvider>
                    {showRegister && <Register onClose={() => setShowRegister(false)} />}
                    {showSignIn && <SignIn onClose={() => setShowSignIn(false)} />}
                    <TopNav onClick={handleMenuClick} />
                    <Nav />
                    <Main />
                </UserProvider>
            </Router>
        </div>
    )
}

export default App
