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

        const data = result.reduce(
            (prev, row) => ({
                ...prev,
                [reportList[row.week]]: row.content,
            }),
            {},
        )

        setFetchedDocuments(data)
    }

    useEffect(() => {
        fetchDocuments()
    }, [setFetchedDocuments])

    useEffect(() => {
        if (documents[report] === undefined) {
            const foundReportContent = fetchedDocuments[report]

            if (foundReportContent !== undefined) {
                return setText(foundReportContent)
            }
        }

        setText(cachedDocuments[report] || '')
    }, [report])

    const setTextCache = (text: string, reportToSet?: string) => {
        const actualReport = reportToSet ? reportToSet : report

        const newDocuments = {
            ...cachedDocuments,
            [actualReport]: text,
        }

        setCachedDocuments(newDocuments)
        localStorage.setItem('editor.documents', JSON.stringify(newDocuments))

        setText(text)
    }

    const setReportCache = (report: string) => {
        setReport(report)
        localStorage.setItem('editor.report', report)
    }

    const discardCache = (report: string, saved = false) => {
        if (!saved) {
            const textToSet = fetchedDocuments[report] || ''

            return setTextCache(textToSet, report)
        }

        setFetchedDocuments({
            ...fetchedDocuments,
            [report]: text,
        })
    }

    return [text, report, setTextCache, setReportCache, discardCache] as const
}

const ReportView: FunctionComponent = () => {
    const [text, report, setTextCache, setReportCache, discardCache] = useEditorCache()
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
                    <Button
                        onClick={() => {
                            localStorage.removeItem('editor.documents')
                        }}
                        size="small"
                    >
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
