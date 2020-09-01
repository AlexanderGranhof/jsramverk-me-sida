import React, { FunctionComponent } from 'react'
import styles from './App.module.scss'

import Nav from './components/nav/nav'

const App: FunctionComponent = () => {
    return (
        <div className={styles['container']}>
            <Nav></Nav>
        </div>
    )
}

export default App
