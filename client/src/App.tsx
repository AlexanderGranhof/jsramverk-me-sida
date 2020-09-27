import React, { FunctionComponent, useState, useContext } from 'react'
import styles from './App.module.scss'
import { authContext } from './contexts/auth'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { Switch, Route, useHistory, RouteProps } from 'react-router-dom'
import * as User from './services/user'
import './App.transitions.scss'

import Nav from './components/nav/nav'
import TopNav from './components/nav/top/top'
import Register from './components/register/register'
import SignIn from './components/signin/signin'

import Main from './views/main/main'
import ReportEdit from './views/report/report'

type PrivateRouteProps = {
    component: FunctionComponent<any>
}

const PrivateRoute: FunctionComponent<PrivateRouteProps & RouteProps> = ({
    component: Component,
    ...rest
}) => {
    const [{ authenticated }] = useContext(authContext)
    const history = useHistory()

    if (!authenticated) {
        history.goBack()
    }

    return <Route {...rest} render={(props) => (authenticated ? <Component {...props} /> : null)} />
}

const App: FunctionComponent = () => {
    console.log(process.env)
    const [showRegister, setShowRegister] = useState(false)
    const [showSignIn, setShowSignIn] = useState(false)
    const [, setAuth] = useContext(authContext)
    const history = useHistory()

    const handleMenuClick = async (item: string) => {
        switch (item) {
            case 'register':
                return setShowRegister(true)

            case 'sign in':
                return setShowSignIn(true)

            case 'sign out':
                await User.logout()
                return setAuth({ username: '', authenticated: false })
            case 'edit reports':
                return history.push('/edit')
        }
    }

    return (
        <Route
            render={({ location }) => (
                <TransitionGroup>
                    <CSSTransition
                        key={location.pathname === '/edit' ? 'edit' : 'reports'}
                        timeout={500}
                        classNames="App"
                    >
                        <Switch location={location}>
                            <PrivateRoute path="/edit" component={ReportEdit} />
                            <Route>
                                <div className={styles['container']}>
                                    {showRegister && (
                                        <Register onClose={() => setShowRegister(false)} />
                                    )}
                                    {showSignIn && <SignIn onClose={() => setShowSignIn(false)} />}
                                    <TopNav onClick={handleMenuClick} />
                                    <Nav />
                                    <Main />
                                </div>
                            </Route>
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
            )}
        />
    )
}

export default App
