import React, { FunctionComponent } from 'react'
import styles from './nav.module.scss'
import { Link } from 'react-router-dom'

const Nav: FunctionComponent = () => {
    return (
        <div className={styles['nav']}>
            <div className={styles['title']}>
                <h1>Alexander Granhof</h1>
                <h2>JSRamverk</h2>
            </div>
            <div className={styles['list-container']}>
                <ul className={styles['list']}>
                    <Link to="/">
                        <li>hem</li>
                    </Link>
                    <Link to="/reports/week/1">
                        <li>kmom01</li>
                    </Link>
                    <Link to="/reports/week/2">
                        <li>kmom02</li>
                    </Link>
                    <Link to="/reports/week/3">
                        <li>kmom03</li>
                    </Link>
                    <Link to="/reports/week/4">
                        <li>kmom04</li>
                    </Link>
                    <Link to="/reports/week/5">
                        <li>kmom05</li>
                    </Link>
                    <Link to="/reports/week/6">
                        <li>kmom06</li>
                    </Link>
                    <Link to="/reports/week/7">
                        <li>kmom10</li>
                    </Link>
                </ul>
            </div>
        </div>
    )
}

export default Nav
