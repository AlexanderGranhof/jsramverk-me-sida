exports.up = function (knex) {
    const users = knex.schema.createTable('users', (table) => {
        table.increments('id')
        table.string('username').unique()
        table.string('password')
    })

    const reports = knex.schema.createTable('reports', (table) => {
        table.increments('id')
        table.integer('week').unique()
        table.string('content')
        table.string('user_id').references('id').inTable('users')
    })

    const chat = knex.schema.createTable('chat', (table) => {
        table.string('user')
        table.date('time')
        table.string('message')
    })

    return Promise.all([users, reports, chat])
}

exports.down = function (knex) {
    knex.schema.dropTable('reports')
    knex.schema.dropTable('users')
    knex.schema.dropTable('chat')
}
