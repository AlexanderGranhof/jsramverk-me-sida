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
                '<h1>Om mig</h1>' +
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
        {
            week: 1,
            user_id: 1,
            content:
                '<a href="https://github.com/AlexanderGranhof/jsramverk-me-sida/tree/1.0.1">Github</a> <a href="https://github.com/AlexanderGranhof/jsramverk-me-sida/blob/1.0.1/README.md">README</a>',
        },
        {
            week: 2,
            user_id: 2,
            content:
                '<h1>Driftssättning av algn18.me</h1>' +
                '<p>För detta kursmomentet har jag faktiskt använt nästan alla av dessa verktygen sedan tidigare. Nginx använder jag nästan alltid när jag bygger något med docker. DigitalOcean har jag redan 2 konton, nu blev det 3. Fail2Ban har jag alltid installerat som standard. Samt med pm2 har jag också testat tidgare, men jag valde att köra med Docker istället</p>' +
                '<p>Det jag lärde mig mest var att man kunde sätta automatiska uppdateringar på sina linux paket. Det visste jag inte om tidigare, samt fick jag lära mig bättre metoder att deploya React med docker i molnet. Men annars gick allt smidigt. Juste certbot har man också använt tidigare for att skaffa gratis SSL. Har använt bokstavligen allt sedan tidigare.</p>' +
                '<p>En sista sak att nämna, jag funderade lite på om man borde använda JWT istället och har kikat pa hur man kan implementera JWT på olika sätt. Jag visste inte om att man kunde spara den i en cookie där JS kunde inte komma åt den. Efter jag lärde mig det sa har jag byggt om servern så den nu kör pa JWT.</p>',
        },
    ])

    return Promise.all([users, reports])
}
