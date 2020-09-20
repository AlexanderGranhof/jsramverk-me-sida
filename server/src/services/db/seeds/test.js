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
                '<a href="https://github.com/AlexanderGranhof/jsramverk-me-sida">You can find this projects repository here</a>' +
                '<h2 id="quickstart">Quickstart</h2>' +
                '<p>run <code>npm run start</code> and navigate to <a href="http://localhost:3000">http://localhost:3000</a></p>' +
                '<p>This project was bootstrapped with <a href="https://github.com/facebook/create-react-app">Create React App</a>.</p>' +
                '<h2 id="available-scripts">Available Scripts</h2>' +
                '<p>In the project directory, you can run:</p>' +
                '<h3 id="-npm-start-"><code>npm start</code></h3>' +
                '<p>Runs the app in the development mode.<br />' +
                'Open <a href="http://localhost:3000">http://localhost:3000</a> to view it in the browser.</p>' +
                '<p>The page will reload if you make edits.<br />' +
                'You will also see any lint errors in the console.</p>' +
                '<h3 id="-npm-test-"><code>npm test</code></h3>' +
                '<p>Launches the test runner in the interactive watch mode.<br />' +
                'See the section about <a href="https://facebook.github.io/create-react-app/docs/running-tests">running tests</a> for more information.</p>' +
                '<h3 id="-npm-run-build-"><code>npm run build</code></h3>' +
                '<p>Builds the app for production to the <code>build</code> folder.<br />' +
                'It correctly bundles React in production mode and optimizes the build for the best performance.</p>' +
                '<p>The build is minified and the filenames include the hashes.<br />' +
                'Your app is ready to be deployed!</p>' +
                '<p>See the section about <a href="https://facebook.github.io/create-react-app/docs/deployment">deployment</a> for more information.</p>' +
                '<h3 id="-npm-run-eject-"><code>npm run eject</code></h3>' +
                '<p><strong>Note: this is a one-way operation. Once you <code>eject</code>, you can’t go back!</strong></p>' +
                '<p>If you aren’t satisfied with the build tool and configuration choices, you can <code>eject</code> at any time. This command will remove the single build dependency from your project.</p>' +
                '<p>Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except <code>eject</code> will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.</p>' +
                '<p>You don’t have to ever use <code>eject</code>. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.</p>' +
                '<h2 id="learn-more">Learn More</h2>' +
                '<p>You can learn more in the <a href="https://facebook.github.io/create-react-app/docs/getting-started">Create React App documentation</a>.</p>' +
                '<p>To learn React, check out the <a href="https://reactjs.org/">React documentation</a>.</p>',
        },
        {
            week: 2,
            user_id: 1,
            content:
                '<a href="https://github.com/AlexanderGranhof/jsramverk-me-sida/tree/1.0.1">Github</a> <a href="https://github.com/AlexanderGranhof/jsramverk-me-sida/blob/1.0.1/README.md">README</a>',
        },
        {
            week: 3,
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
