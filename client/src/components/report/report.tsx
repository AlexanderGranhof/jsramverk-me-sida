import React, { FunctionComponent, useState, useEffect } from 'react'
import { RouteComponentProps, useHistory } from 'react-router-dom'
import * as Report from '../../services/report'

type MatchParams = {
    weekNumber: string
}

const Kmom01: FunctionComponent<RouteComponentProps<MatchParams>> = ({ match }) => {
    const [text, setText] = useState<string[]>([])
    const history = useHistory()

    const isRoot = history.location.pathname === '/'
    const weekNumber = parseInt(match.params.weekNumber)

    const fetchData = async () => {
        const response = await (isRoot ? Report.about() : Report.week(weekNumber))

        if (response.status === 404) {
            return setText(['This report has not been written yet'])
        }

        if (!response.ok) {
            return console.warn('unable to fetch report week 1')
        }

        const res = (await response.text()).split('\n')

        setText(res)
    }

    useEffect(() => {
        if (isNaN(weekNumber) && !isRoot) {
            return history.replace('/')
        }

        fetchData()
    }, [])

    const [title, ...paragraphs] = text

    return (
        <div>
            <h1>{title}</h1>
            {paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
            ))}
        </div>
    )
}

export default Kmom01
