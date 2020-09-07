import React, { FunctionComponent, useState, useEffect } from 'react'
import { RouteComponentProps, useHistory } from 'react-router-dom'
import * as Report from '../../services/report'

type MatchParams = {
    weekNumber: string
}

type ReportData = {
    title: string
    content?: string
}

const Kmom01: FunctionComponent<RouteComponentProps<MatchParams>> = ({ match }) => {
    const [text, setText] = useState<ReportData>({ title: '', content: '' })
    const history = useHistory()

    const isRoot = history.location.pathname === '/'
    const weekNumber = parseInt(match.params.weekNumber)

    const fetchData = async () => {
        const response = await (isRoot ? Report.about() : Report.week(weekNumber))

        if (response.status === 404) {
            return setText({ title: 'This report has not been written yet' })
        }

        if (!response.ok) {
            return console.warn('unable to fetch report week 1')
        }

        const { title, content } = await response.json()

        setText({ title, content })
    }

    useEffect(() => {
        if (isNaN(weekNumber) && !isRoot) {
            return history.replace('/')
        }

        fetchData()
    }, [])

    const { title, content } = text
    const paragraphs = content?.split('\n')

    return (
        <div>
            <h1>{title}</h1>
            {paragraphs && paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
    )
}

export default Kmom01
