import React, { FunctionComponent } from 'react'
import styles from './button.module.scss'

type ButtonProps = {
    onClick?: () => void
    size?: 'small' | 'normal' | 'large'
    type?: 'normal' | 'primary' | 'danger'
    className?: string
}

const Button: FunctionComponent<ButtonProps> = (props) => {
    const { children, onClick, size = 'normal', type = 'normal', className = '' } = props
    const buttonClassName = `${className} ${styles['button']} ${styles[size]} ${
        styles[`type-${type}`]
    }`

    return (
        <button onClick={onClick?.bind(null)} className={buttonClassName}>
            {children}
        </button>
    )
}

export default Button
