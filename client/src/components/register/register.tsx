import React, { FunctionComponent, useState, useContext } from 'react'
import styles from './register.module.scss'
import { CSSTransition } from 'react-transition-group'
import './register.transitions.scss'
import * as User from '../../services/user'
import { authContext } from '../../contexts/auth'

import Input from '../input/input'
import Button from '../button/button'

type RegisterProps = {
    onClose?: () => void
}

const Register: FunctionComponent<RegisterProps> = (props) => {
    const sendCloseEvent = () => {
        typeof props.onClose === 'function' && props.onClose()
    }

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')

    const [, setAuth] = useContext(authContext)

    const defaultErrors = {
        username: '',
        password: '',
        rePassword: '',
    }

    const [errors, setErrors] = useState(defaultErrors)

    const clearUsernameErrors = () => {
        setErrors({ ...errors, username: '' })
    }

    const clearPasswordErrors = () => {
        setErrors({ ...errors, password: '', rePassword: '' })
    }

    const handlePasswordCompare = () => {
        console.log(password, rePassword)

        if (password === '' || rePassword === '') {
            return
        }

        if (password !== rePassword) {
            setErrors({ ...errors, rePassword: 'passwords do not match' })
        }

        return clearPasswordErrors()
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

        if (rePassword === '') {
            setErrors({ ...errors, rePassword: 'password cannot be empty' })
            return false
        }

        if (password !== rePassword) {
            setErrors({ ...errors, rePassword: 'passwords do not match' })
            return false
        }

        const { taken } = await (await User.taken(username)).json()

        if (taken) {
            setErrors({ ...errors, username: 'username already taken' })
            return false
        }

        return true
    }

    const handleSubmit = async (event?: React.FormEvent<HTMLFormElement>) => {
        if (event) {
            event.preventDefault()
        }

        const valid = await verifyFields()

        if (!valid) {
            return
        }

        const response = await User.create(username, password)

        if (response.ok) {
            const { username } = await response.json()

            setAuth({ username, authenticated: true })
        }

        sendCloseEvent()
    }

    return (
        <React.Fragment>
            <CSSTransition classNames="fade-in" timeout={300} appear={true} in={true}>
                <div className={styles['register-form']}>
                    <form onSubmit={handleSubmit}>
                        <h1>Register new user</h1>
                        <div>
                            <Input
                                label="Username"
                                name="username"
                                type="text"
                                onInput={(value) => {
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
                                    setPassword(value)
                                    clearPasswordErrors()
                                }}
                                onBlur={handlePasswordCompare}
                                errorText={errors.password}
                                showError={!!errors.password}
                            />
                            <Input
                                label="Re-type password"
                                name="re-password"
                                type="password"
                                onInput={setRePassword}
                                onBlur={handlePasswordCompare}
                                errorText={errors.rePassword}
                                showError={!!errors.rePassword}
                            />
                            <Button onClick={handleSubmit} className={styles['button']}>
                                Register
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
