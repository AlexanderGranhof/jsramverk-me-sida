import React, { FunctionComponent } from 'react'
import styles from './top.module.scss'

type TopNavProps = {
    onClick?: (listItem: string) => void
}

const Top: FunctionComponent<TopNavProps> = (props) => {
    const items = ['sign in', 'register']

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
