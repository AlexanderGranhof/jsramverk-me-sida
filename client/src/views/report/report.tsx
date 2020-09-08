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
    const [fetchedReports, setFetchedReports] = useState<FetchedReport[]>([])

    const fetchAllReports = async () => {
        const response = await Report.all()

        if (!response.ok) {
            return console.error('unable to fetch reports')
        }

        setFetchedReports(await response.json())
    }

    useEffect(() => {
        fetchAllReports()
    }, [])

    let cachedDocumentObject = safeJSONParse(localStorage.getItem(`cache.editor_documents`), {})
    const cachedCurrentReport = localStorage.getItem('cache.editor_report') || 'about'

    const loadTextFromReport = useCallback(
        (reportName: string) => {
            let text = cachedDocumentObject[reportName]

            if (text === undefined) {
                const weekNumber = reportList.findIndex((report) => {
                    return report.toLowerCase() === cachedCurrentReport.toLowerCase()
                })

                const report = fetchedReports.find((report) => report.week === weekNumber)

                text = report ? report.content : ''
            }

            return text
        },
        [cachedCurrentReport, cachedDocumentObject, fetchedReports],
    )

    const cachedText = loadTextFromReport(cachedCurrentReport)

    const [text, setText] = useState<string>(cachedText)
    const [report, setReport] = useState<string>(cachedCurrentReport)

    const setTextCache = (text: string) => {
        const documentsObject = {
            ...cachedDocumentObject,
            [report]: text,
        }
        const documents = JSON.stringify(documentsObject)

        localStorage.setItem(`cache.editor_documents`, documents)
        cachedDocumentObject = { ...documentsObject }

        setText(text)
    }

    const setReportCache = (report: string) => {
        localStorage.setItem('cache.editor_report', report)
        setReport(report)
    }

    const discardCache = (reportName?: string) => {
        if (reportName) {
            const index = reportList.findIndex((reportItem) => {
                return reportItem.toLowerCase() === reportName.toLowerCase()
            })

            const foundFetchedReport = fetchedReports.find((fetchedReport) => {
                return fetchedReport.week === index
            })

            if (foundFetchedReport) {
                return setTextCache(foundFetchedReport.content)
            }
        }

        cachedDocumentObject = reportList.reduce((prev, reportItem, index) => {
            const foundFetchedReport = fetchedReports.find((fetchedReport) => {
                return fetchedReport.week === index
            })

            return {
                ...prev,
                [reportItem]: foundFetchedReport ? foundFetchedReport.content : '',
            }
        }, {})

        localStorage.setItem(`cache.editor_documents`, JSON.stringify(cachedDocumentObject))

        setText(cachedDocumentObject[report])
    }

    useEffect(() => {
        setText(loadTextFromReport(report))
    }, [report, loadTextFromReport])

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
        console.log(report)
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

        discardCache(report)
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
