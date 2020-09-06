import React, { FunctionComponent } from 'react'
import styles from './App.module.scss'
import './App.transitions.scss'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import Nav from './components/nav/nav'

import Report from './components/report/report'

const App: FunctionComponent = () => {
    return (
        <div className={styles['container']}>
            <Router>
                <Nav />
                <div className={styles['content']}>
                    <Route
                        render={({ location }) => (
                            <TransitionGroup>
                                <CSSTransition
                                    key={location.pathname}
                                    timeout={5000}
                                    classNames="page"
                                >
                                    <Switch location={location}>
                                        <Route exact path="/" component={Report} />
                                        <Route
                                            path="/reports/week/:weekNumber"
                                            component={Report}
                                        />
                                    </Switch>
                                </CSSTransition>
                            </TransitionGroup>
                        )}
                    ></Route>
                </div>
            </Router>
        </div>
    )
}

export default App
