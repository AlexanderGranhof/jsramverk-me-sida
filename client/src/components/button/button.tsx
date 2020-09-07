import React, { FunctionComponent } from 'react'
import styles from './button.module.scss'

type ButtonProps = {
    onClick?: () => void
    type?: 'small' | 'normal' | 'large'
    className?: string
}

const Button: FunctionComponent<ButtonProps> = (props) => {
    const { children, onClick, type = 'normal', className = '' } = props
    const buttonClassName = `${className} ${styles['button']} ${styles[type]}`

    return (
        <button onClick={onClick?.bind(null)} className={buttonClassName}>
            {children}
        </button>
    )
}

export default Button
