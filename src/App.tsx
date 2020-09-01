import React, { FunctionComponent, useState } from 'react'
import styles from './App.module.scss'
import './App.transitions.scss'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import Nav from './components/nav/nav'

import About from './reports/about/about'
import Kmom01 from './reports/kmom01/kmom01'
import Kmom02 from './reports/kmom02/kmom02'
import Kmom03 from './reports/kmom03/kmom03'
import Kmom04 from './reports/kmom04/kmom04'
import Kmom05 from './reports/kmom05/kmom05'
import Kmom06 from './reports/kmom06/kmom06'
import Kmom10 from './reports/kmom10/kmom10'

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
                                        <Route path="/reports/week/3" component={Kmom03} />
                                        <Route path="/reports/week/4" component={Kmom04} />
                                        <Route path="/reports/week/5" component={Kmom05} />
                                        <Route path="/reports/week/6" component={Kmom06} />
                                        <Route path="/reports/week/7" component={Kmom10} />
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
