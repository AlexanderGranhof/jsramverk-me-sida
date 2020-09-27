import React, { FunctionComponent, useState, useContext } from 'react'
import styles from './signin.module.scss'
import { CSSTransition } from 'react-transition-group'
import './signin.transitions.scss'
import * as User from '../../services/user'

import Input from '../input/input'
import Button from '../button/button'
import { authContext } from '../../contexts/auth'

type RegisterProps = {
    onClose?: () => void
}

const Register: FunctionComponent<RegisterProps> = (props) => {
    const sendCloseEvent = () => {
        typeof props.onClose === 'function' && props.onClose()
    }

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [, setAuth] = useContext(authContext)

    const defaultErrors = {
        username: '',
        password: '',
    }

    const [errors, setErrors] = useState(defaultErrors)

    const clearUsernameErrors = () => {
        setErrors({ ...errors, username: '' })
    }

    const clearPasswordErrors = () => {
        setErrors({ ...errors, password: '' })
    }

    const verifyFields = async () => {
        if (username === '') {
            setErrors({ ...errors, username: 'username cannot be empty' })
            return false
        }

        if (password === '') {
            setErrors({ ...errors, password: 'password cannot be empty' })
            return false
        }

        return true
    }

    const handleSubmit = async (event?: React.FormEvent<HTMLFormElement>) => {
        if (event) {
            event.preventDefault()
        }

        // const valid = await verifyFields()

        // if (!valid) {
        //     return
        // }

        const response = await User.login(username, password)

        if (response.status === 401) {
            return setErrors({
                ...errors,
                username: 'Incorrect username or password',
                password: 'Incorrect username or password',
            })
        }

        if (response.ok) {
            const { username } = await response.json()

            setAuth({ username, authenticated: true })
        }

        return sendCloseEvent()
    }

    return (
        <React.Fragment>
            <CSSTransition classNames="fade-in" timeout={300} appear={true} in={true}>
                <div className={styles['register-form']}>
                    <form onSubmit={handleSubmit}>
                        <h1>Sign in</h1>
                        <div>
                            <Input
                                label="Username"
                                name="username"
                                type="text"
                                onInput={(value) => {
                                    handleSubmit()
                                    setUsername(value)
                                    clearUsernameErrors()
                                }}
                                errorText={errors.username}
                                showError={!!errors.username}
                            />
                            <Input
                                label="Password"
                                name="password"
                                type="password"
                                onInput={(value) => {
                                    handleSubmit()
                                    setPassword(value)
                                    clearPasswordErrors()
                                }}
                                errorText={errors.password}
                                showError={!!errors.password}
                            />
                            <Button onClick={() => handleSubmit()} className={styles['button']}>
                                Sign in
                            </Button>
                        </div>
                    </form>
                </div>
            </CSSTransition>
            <div onClick={sendCloseEvent} className={styles['overlay']} />
        </React.Fragment>
    )
}

export default Register
