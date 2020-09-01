import React, { FunctionComponent, useState } from 'react'
import styles from './App.module.scss'
import './App.transitions.scss'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import Nav from './components/nav/nav'

import About from './reports/about/about'
import Kmom01 from './reports/kmom01/kmom01'
import Kmom02 from './reports/kmom02/kmom02'

const App: FunctionComponent = () => {
    return (
        <div className={styles['container']}>
            <Router>
                <Nav />
                <div className={styles['content']}>
                    <Route
                        render={({ location }) => (
                            <TransitionGroup>
                                <CSSTransition key={location.key} timeout={5000} classNames="page">
                                    <Switch location={location}>
                                        <Route exact path="/" component={About} />
                                        <Route path="/reports/week/1" component={Kmom01} />
                                        <Route path="/reports/week/2" component={Kmom02} />
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
