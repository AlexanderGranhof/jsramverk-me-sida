exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('table_name')
        .del()
        .then(function () {
            // Inserts seed entries
            const users = knex('users').insert([{ username: 'test', password: 'test' }])
            const reports = knex('users').insert([{ title: 'test', content: '', user_id: 1 }])

            return Promise.all([users, reports])
        })
}
