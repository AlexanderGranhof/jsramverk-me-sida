import React, { FunctionComponent } from 'react'
import styles from './input.module.scss'
import { CSSTransition } from 'react-transition-group'
import './input.transitions.scss'

type InputProps = {
    onInput?: (value: string) => void
    onBlur?: (value: string) => void
    onFocus?: (value: string) => void
    name: string
    label: string
    type: string
    errorText?: string
    showError?: boolean
}

const Input: FunctionComponent<InputProps> = (props) => {
    const { onInput, onBlur, onFocus, name, label, type, showError, errorText } = props

    const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
        typeof onInput === 'function' && onInput(event.currentTarget.value)
    }

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        typeof onBlur === 'function' && onBlur(event.currentTarget.value)
    }

    const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        typeof onFocus === 'function' && onFocus(event.currentTarget.value)
    }

    return (
        <div className={styles['input-container']}>
            <input
                className={`${showError ? styles['error-input'] : ''}`}
                onInput={handleInput}
                onBlur={handleBlur}
                onFocus={handleFocus}
                id={name}
                name={name}
                type={type}
                placeholder=" "
            />
            <label htmlFor={name}>{label}</label>

            <CSSTransition in={showError} timeout={120} classNames="error">
                <span className={styles['error']}>{errorText}</span>
            </CSSTransition>
        </div>
    )
}

export default Input
