import React, { FunctionComponent, useState, useEffect, useCallback } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import styles from './report.module.scss'
import Button from '../../components/button/button'
import * as Report from '../../services/report'

type FetchedReport = {
    id: number
    week: number
    content: string
    user_id: number
}

const reportList = [
    'About',
    'Report 1',
    'Report 2',
    'Report 3',
    'Report 4',
    'Report 5',
    'Report 6',
    'Report 10',
]

const safeJSONParse = (data: any, fallback: any) => {
    try {
        const result = JSON.parse(data)

        return result === null ? fallback : result
    } catch {
        return fallback
    }
}

const useEditorCache = () => {
    const recentReport = localStorage.getItem('editor.report') || 'about'
    const documents = safeJSONParse(localStorage.getItem('editor.documents'), {})

    const [cachedDocuments, setCachedDocuments] = useState(documents)
    const [report, setReport] = useState(recentReport)
    const [text, setText] = useState(documents[report] || '')
    const [fetchedDocuments, setFetchedDocuments] = useState<Record<string, string>>({})

    const fetchDocuments = async () => {
        const response = await Report.all()

        const result: FetchedReport[] = await response.json()
        const currentReport = report.toLowerCase()

        const data: Record<string, string> = result.reduce((prev, row) => {
            const reportName =
                row.week <= reportList.length
                    ? reportList[row.week].toLowerCase()
                    : `Report ${row.week}`

            return {
                ...prev,
                [reportName]: row.content,
            }
        }, {})

        if (documents[currentReport] === undefined) {
            const foundReportContent = data[currentReport]

            if (foundReportContent !== undefined) {
                setText(foundReportContent)
            }
        }

        setText(cachedDocuments[currentReport] || '')
        setFetchedDocuments(data)
    }

    useEffect(() => {
        fetchDocuments()
    }, [])

    useEffect(() => {
        const reportToSet = report.toLowerCase()

        if (cachedDocuments[reportToSet] === undefined) {
            const foundReportContent = fetchedDocuments[reportToSet]

            if (foundReportContent !== undefined) {
                return setText(foundReportContent)
            }
        }

        setText(cachedDocuments[reportToSet] || '')
    }, [report, fetchedDocuments])

    const setTextCache = (text: string, reportToSet?: string) => {
        const actualReport = reportToSet ? reportToSet.toLowerCase() : report.toLowerCase()

        const newDocuments = {
            ...cachedDocuments,
            [actualReport]: text,
        }

        setCachedDocuments(newDocuments)
        localStorage.setItem('editor.documents', JSON.stringify(newDocuments))

        setText(text)
    }

    const setReportCache = (report: string) => {
        const reportToSet = report.toLowerCase()

        setReport(reportToSet)
        localStorage.setItem('editor.report', reportToSet)
    }

    const discardCache = (report: string, saved = false) => {
        const reportToDiscard = report.toLowerCase()

        if (!saved) {
            const textToSet = fetchedDocuments[reportToDiscard] || ''

            return setTextCache(textToSet, reportToDiscard)
        }

        setFetchedDocuments({
            ...fetchedDocuments,
            [reportToDiscard]: text,
        })
    }

    const resetCache = () => {
        localStorage.removeItem('editor.documents')
        setCachedDocuments(safeJSONParse(localStorage.getItem('editor.documents'), {}))
        fetchDocuments()
    }

    return [text, report, setTextCache, setReportCache, discardCache, resetCache] as const
}

const ReportView: FunctionComponent = () => {
    const [text, report, setTextCache, setReportCache, discardCache, resetCache] = useEditorCache()
    const [currentReport, setCurrentReport] = useState(report)
    const [editorLoaded, setEditorLoaded] = useState(false)

    const [isSaving, setIsSaving] = useState(false)

    const handleEdit = (text: string) => {
        setTextCache(text)
    }

    const handleDiscardChanges = () => {
        discardCache(report)
    }

    const setReport = (reportToSet: string) => {
        setCurrentReport(reportToSet)
        setReportCache(reportToSet)
    }

    const handleSave = async () => {
        setIsSaving(true)

        const week = reportList.findIndex((reportName) => {
            return reportName.toLowerCase() === report.toLowerCase()
        })

        if (week < 0) {
            setIsSaving(false)
            return alert('Unable to find the correct report')
        }

        await Report.create(text, week)

        discardCache(report, true)
        setIsSaving(false)
    }

    const handleReset = () => {
        resetCache()
        window.location.reload()
    }

    const EditorSettings = {
        plugins: 'autoresize',
        width: '100%',
        menu: {
            custom: {
                title: 'Select report',
                items: reportList,
            },
        },
        menubar: 'custom',
        setup: function (editor: any) {
            reportList.forEach((currentReport) => {
                editor.ui.registry.addMenuItem(currentReport, {
                    text: currentReport,
                    onAction: () => setReport(currentReport),
                })
            })
        },
    }

    return (
        <div>
            <div className={styles['editor-page-container']}>
                <h1>Edit reports</h1>
                <div className={styles['button-container']}>
                    <Button disabled={isSaving} onClick={handleSave}>
                        Save
                    </Button>
                    <Button disabled={isSaving} onClick={handleDiscardChanges} type="danger">
                        Discard changes
                    </Button>
                    <Button onClick={handleReset} size="small">
                        reset
                    </Button>
                </div>
                <div className={styles['editor-container']}>
                    {editorLoaded && (
                        <span className={styles['current-edit']}>
                            Currently editing: <b>{currentReport}</b>
                        </span>
                    )}
                    <Editor
                        onInit={() => setEditorLoaded(true)}
                        init={EditorSettings}
                        value={text}
                        onEditorChange={handleEdit}
                    />
                </div>
            </div>
        </div>
    )
}

export default ReportView
