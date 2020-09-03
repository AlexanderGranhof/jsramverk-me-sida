exports.seed = async function (knex) {
    // Deletes ALL existing entries

    const usersDel = knex('users').del()
    const reportsDel = knex('reports').del()

    await Promise.all([usersDel, reportsDel])

    // Inserts seed entries
    const users = knex('users').insert([{ username: 'test', password: 'test' }])
    const reports = knex('reports').insert([{ title: 'test', content: '', user_id: 1 }])

    return Promise.all([users, reports])
}
