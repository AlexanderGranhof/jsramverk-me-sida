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
        {
            week: 4,
            user_id: 2,
            content:
                '<h1>3 usecases</h1>' +
                '<p>Det första usecase för min me-applikation är startsidan där man borde se en titel, login knapp, och om komponenten som beskriver hemsidan</p>' +
                '<p>Det andra usecase är när man byter reports på sidan, och att innehållet faktiskt ändras på startsidan</p>' +
                '<p>Det sisa usecaset är när man redigerar reports inne på edit reports vyen. Där ska man kunna skriva in en del text, klicka spara och ladda om sidan för att se att ändringarna har gått igenom.</p>',
        },
        {
            week: 5,
            user_id: 2,
            content: '<h1>Igen rapportering för kmom05 enligt jsramverk.se</h1>',
        },
        {
            week: 6,
            user_id: 2,
            content: '<h1>Igen rapportering för kmom06 enligt jsramverk.se</h1>',
        },
        {
            week: 7,
            user_id: 2,
            content:
                '<h1>Projektet</h1>' +
                '<h2>Krav 4</h2>' +
                '<p>För krav 4 valde jag att använda samma test bilbiotek som frontend, jest. Jest erbjuder kodtäckning direkt utan några andra bibliotek som måste installeras. Samt gör det lättare för potientiella andra utvecklare att skriva tester då det är samma syntax som i backend som frontend. Jag testade alla mina middlewares förutom de som används i main filen, då är det fel med dem så krashar servern direkt. Mina routes testar jag då inte som unit tests utan de körs som integration tests som också körs med jest.</p>' +
                '<h2>Krav 5</h2>' +
                '<p>För testerna i frontend så använde jag mig av det som kommer med React. De använder jest som är deras egna testnings bibliotek. Jest har mycket bra stöd för att testa react där de erbjuder flera verktyg att rendera och debugga den virtuella react DOM. Denna gången var det mycket enklare att testa då du behöver inte ha en server körades med både backend och frontend som ska fungera. Med jest kan du mocka backended genom att skapa en proxy för fetch API:et där du själv manuellt retunerar fake data. Skulle definitift rekommendera att ni byter från selenium till testningbiblioteket som kommer med varje ramverk.</p>' +
                '<h2>Krav 6</h2>' +
                '<p>Det är lite oklart om vad vi faktiskt skulle skriva om för detta kravet. Lät först som vi skulle skriva om vad som ha gjorts inom att visa en chart för en marknad. Men frågade och fick svar efteråt. Skulle inte skada att har lite mer information om vad och hur vi ska skriva. Vilka krav det är på det, hur mycket ska vi skriva och hur djupt ska man skriva om det? Vet ej hur många referenser man ska använda. I mitt fall använde jag två eller tre referenser för varje fråga jag hade. I mitt fall så skrev båda referenser väldigt likt om det mina fråger handlade om så det var inget de hade "in conflict with each other" som det står på jsramverk.se</p>' +
                '<p>Generellt tycker jag att projektet gick okej. Inte jättebra då jag skulle gärna vilja att min chart blev bättre. Då jag utmanade mig själv att bygga en helt från grunden med hjälp av d3.js. Jag lärde mig mycket och ska definitft använde det för min egen portfolio samt med gsap. Gsap ett annat animations bibliotek som jag använde mig av för att göra alla animationer på hemsidan. Det ska vara ganska populärt och är väldigt lätt att använda. Skulle inte vara emot om man hade kanske en vecka till för projektet.</p>' +
                '<p>Till sist om feedback, det skulle inte vara dummt om man hade en mer detaljerad guide om CI. Jag bet att många satt fast med tesning i kmom4 eller 5 där det gick inte alls att få något att fungera på CI. Hur man faksiskt få en server och en klient att köra på ett CI så man kan testa det. Sedan till sist så finns det ett par youtube klipp som snabbt beskriver varje ramverk väldigt snyggt som jag kan rekommendera att man har på jsramverk.se för framtida studenter. Länkar dem tre undertill.<p>' +
                '<a href="https://www.youtube.com/watch?v=Tn6-PIqc4UM">https://www.youtube.com/watch?v=Tn6-PIqc4UM</a>' +
                '<a href="https://www.youtube.com/watch?v=Ata9cSC2WpM">https://www.youtube.com/watch?v=Ata9cSC2WpM</a>' +
                '<a href="https://www.youtube.com/watch?v=nhBVL41-_Cw">https://www.youtube.com/watch?v=nhBVL41-_Cw</a>',
        },
    ])

    return Promise.all([users, reports])
}
