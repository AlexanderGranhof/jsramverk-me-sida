import React, { FunctionComponent } from 'react'

const About: FunctionComponent = () => {
    return (
        <div>
            <h1>Om mig</h1>
            <p>
                Hej mitt namn är Alexander Granhof och detta är min me sida för JSRamverk kursen.
                När det gäller ramverk så har jag tidigare jobbat mycket med React och Typescript
                och det är det jag planerar att använda under kursen.
            </p>
            <p>
                Under sommaren har jag haft möjlighet att arbeta med ramverket Angular hos Ericsson.
                Personligen föredrar jag React men jag kan se varför vissa kan föredra just Angular.
                Angular känns mer bestämmt om hur man ska arbeta i det, medan React kan man arbeta
                med det lite som man känner för.
            </p>
            <p>
                Jag hoppas att i denna kursen att jag kan gå lite djupare i hur man just deployar
                React i molntjänster och hur man kan konfiguera en sådan server. Samt att jag går
                djupare i react genom att bygga lite mer avancerade applikationer som kräver lite
                och att få upp en bra struktur på sin kod och miljö.
            </p>
        </div>
    )
}

export default About
