import React, { FunctionComponent } from 'react'
import styles from './main.module.scss'
import './main.transitions.scss'
import { Route, Switch } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import Report from '../../components/report/report'

const Main: FunctionComponent = () => {
    return (
        <div className={styles['content']}>
            <Route
                render={({ location }) => (
                    <TransitionGroup>
                        <CSSTransition key={location.pathname} timeout={5000} classNames="page">
                            <Switch location={location}>
                                <Route exact path="/" component={Report} />
                                <Route path="/reports/week/:weekNumber" component={Report} />
                                <Route path="/register" />
                            </Switch>
                        </CSSTransition>
                    </TransitionGroup>
                )}
            ></Route>
        </div>
    )
}

export default Main
