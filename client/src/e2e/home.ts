import { expect } from 'chai'
import createDriver, { signIn } from './driver'
import { By } from 'selenium-webdriver'

describe('Home view', () => {
    beforeEach(async function () {
        this.driver = await createDriver()
        this.signIn = signIn(this.driver)

        await this.driver.navigate().to('http://localhost:3000')
    })

    afterEach(function () {
        this.driver.close()
    })

    it('can load home view', async function () {
        const title = await this.driver.findElement(By.tagName('title'))
        const body = await this.driver.findElement(By.tagName('body'))

        expect(await title.getAttribute('innerText')).to.eq('Alexander Granhof')
        expect(await body.getAttribute('innerHTML')).to.not.eq('')
    })

    it('can sign in', async function () {
        await this.signIn()

        const signOut = await this.driver.findElement(By.css('nav li:last-child'))

        expect((await signOut.getAttribute('innerText')).toLowerCase()).to.eq('sign out')
    })

    it('can load reports', async function () {
        const [home, kmom01] = await this.driver.findElements(By.css('[class^="nav_list"] a '))
        const report = () => this.driver.findElement(By.css('[class^="main_content"] > div > div'))

        await home.click()
        const homeText = await (await report()).getAttribute('innerHTML')

        expect(homeText).to.not.eq('')

        await kmom01.click()
        const kmom01Text = await (await report()).getAttribute('innerHTML')

        expect(kmom01Text).to.not.eq('')

        expect(homeText).to.not.eq(kmom01Text)
    })
})
