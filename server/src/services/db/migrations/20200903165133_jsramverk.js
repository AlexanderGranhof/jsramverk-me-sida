exports.up = function (knex) {
    const users = knex.schema.createTable('users', (table) => {
        table.increments('id')
        table.string('username')
        table.string('password')
    })

    const reports = knex.schema.createTable('reports', (table) => {
        table.increments('id')
        table.string('title')
        table.string('content')
        table.string('user_id').references('id').inTable('users')
    })

    return Promise.all([users, reports])
}

exports.down = function (knex) {
    knex.schema.dropTable('reports')
    knex.schema.dropTable('users')
}
