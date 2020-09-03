import db from './db'

const reports = db('reports')

export const all = () => {
    return reports.select('*')
}
