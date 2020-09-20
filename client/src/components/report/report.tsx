import React, { FunctionComponent, useState, useEffect } from 'react'
import { RouteComponentProps, useHistory } from 'react-router-dom'
import * as Report from '../../services/report'

type MatchParams = {
    weekNumber: string
}

type ReportData = {
    content?: string
}

const Kmom01: FunctionComponent<RouteComponentProps<MatchParams>> = ({ match }) => {
    const [text, setText] = useState<ReportData>({ content: '' })
    const history = useHistory()

    const isRoot = history.location.pathname === '/'
    const weekNumber = parseInt(match.params.weekNumber)

    const fetchData = async () => {
        const response = await (isRoot ? Report.about() : Report.week(weekNumber))

        if (response.status === 404) {
            return setText({ content: '<h1>This report has not been written yet</h1>' })
        }

        if (!response.ok) {
            return console.warn('unable to fetch report week 1')
        }

        const { content } = await response.json()

        setText({ content })
    }

    useEffect(() => {
        if (isNaN(weekNumber) && !isRoot) {
            return history.replace('/')
        }

        fetchData()
    }, [])

    return (
        <div
            className="page-enter-done"
            dangerouslySetInnerHTML={{ __html: text.content || '' }}
        ></div>
    )
}

export default Kmom01
