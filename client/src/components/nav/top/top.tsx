import React, { FunctionComponent, useContext } from 'react'
import styles from './top.module.scss'
import { authContext } from '../../../contexts/auth'

type TopNavProps = {
    onClick?: (listItem: string) => void
}

const Top: FunctionComponent<TopNavProps> = (props) => {
    const signedOutMenu = ['register', 'sign in']
    const signedInMenu = ['edit reports', 'sign out']

    const [auth] = useContext(authContext)

    const items = auth.authenticated ? signedInMenu : signedOutMenu

    const handleClick = (item: string) => {
        typeof props.onClick === 'function' && props.onClick(item)
    }

    return (
        <nav className={styles['top-nav']}>
            {items.map((listItem) => (
                <li onClick={() => handleClick(listItem)} key={listItem}>
                    {listItem}
                </li>
            ))}
        </nav>
    )
}

export default Top
