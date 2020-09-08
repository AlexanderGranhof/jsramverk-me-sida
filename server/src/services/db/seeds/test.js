exports.seed = async function (knex) {
    // Deletes ALL existing entries

    const usersDel = knex('users').del()
    const reportsDel = knex('reports').del()

    await Promise.all([usersDel, reportsDel])

    // Inserts seed entries
    const users = knex('users').insert([
        { username: 'admin', password: '$2b$12$gdFux3xlax5mSqQWpiWgwO2F8ste2cGqR9N12nN4Ps.fL7qst3tJS' },
    ])
    const reports = knex('reports').insert([
        {
            week: 0,
            user_id: 1,
            content:
                '<p>Hej mitt namn är Alexander Granhof och detta är min me sida för JSRamverk kursen. ' +
                'När det gäller ramverk så har jag tidigare jobbat mycket med React och Typescript ' +
                'och det är det jag planerar att använda under kursen.</p>\n' +
                '<p>Under sommaren har jag haft möjlighet att arbeta med ramverket Angular hos Ericsson. ' +
                'Personligen föredrar jag React men jag kan se varför vissa kan föredra just Angular. ' +
                'Angular känns mer bestämmt om hur man ska arbeta i det, medan React kan man arbeta ' +
                'med det lite som man känner för.</p>\n' +
                '<p>Jag hoppas att i denna kursen att jag kan gå lite djupare i hur man just deployar ' +
                'React i molntjänster och hur man kan konfiguera en sådan server. Samt att jag går ' +
                'djupare i react genom att bygga lite mer avancerade applikationer som kräver lite ' +
                'och att få upp en bra struktur på sin kod och miljö.</p>\n',
        },
    ])

    return Promise.all([users, reports])
}
