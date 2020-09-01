import React, { FunctionComponent } from 'react'
import styles from './nav.module.scss'

const Nav: FunctionComponent = () => {
    return (
        <div className={styles['nav']}>
            <div className={styles['title']}>
                <h1>Alexander Granhof</h1>
                <h2>JSRamverk</h2>
            </div>
            <div className={styles['list-container']}>
                <ul className={styles['list']}>
                    <li>hem</li>
                    <li>kmom01</li>
                    <li>kmom02</li>
                    <li>kmom03</li>
                    <li>kmom04</li>
                    <li>kmom05</li>
                    <li>kmom06</li>
                    <li>kmom10</li>
                </ul>
            </div>
        </div>
    )
}

export default Nav
