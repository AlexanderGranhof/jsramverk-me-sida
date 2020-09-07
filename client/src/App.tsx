import React, { FunctionComponent, useState } from 'react'
import styles from './App.module.scss'

import { BrowserRouter as Router } from 'react-router-dom'

import Nav from './components/nav/nav'
import TopNav from './components/nav/top/top'

import Main from './views/main/main'
import Register from './components/register/register'

const App: FunctionComponent = () => {
    const [showRegister, setShowRegister] = useState(true)

    const handleMenuClick = (item: string) => {
        console.log(item)
        if (item === 'register') {
            return setShowRegister(true)
        }
    }

    return (
        <div className={styles['container']}>
            <Router>
                {showRegister && <Register onClose={() => setShowRegister(false)} />}
                <TopNav onClick={handleMenuClick} />
                <Nav />
                <Main />
            </Router>
        </div>
    )
}

export default App
