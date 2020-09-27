import { expect } from 'chai'
import createDriver, { signIn, domain } from './driver'
import { By, WebElement, Key } from 'selenium-webdriver'

describe('report view', function () {
    beforeEach(async function () {
        this.timeout(10000)

        this.driver = await createDriver()
        this.signIn = signIn(this.driver)

        await this.driver.navigate().to(domain)

        await this.signIn()

        const editReportsBtn = await this.driver.findElement(By.css('nav li:first-child'))
        await editReportsBtn.click()

        await this.driver.sleep(1500)
    })

    afterEach(function () {
        this.driver.close()
    })

    it('can load reports view', async function () {
        this.timeout(10000)

        const iframe = await this.driver.findElement(By.tagName('iframe'))

        expect(iframe instanceof WebElement).to.be.true
    })

    it('can edit report', async function () {
        this.timeout(15000)

        await this.driver.switchTo().frame(await this.driver.findElement(By.tagName('iframe')))

        const title = 'test'
        const editor = await this.driver.findElement(By.css('body'))

        await editor.click()
        await editor.clear()
        await editor.sendKeys(title)

        await this.driver.navigate().refresh()
        await this.driver.switchTo().frame(await this.driver.findElement(By.tagName('iframe')))

        const afterTitle = await (await this.driver.findElement(By.tagName('p'))).getAttribute(
            'innerText',
        )

        await this.driver.switchTo().parentFrame()

        expect(afterTitle).to.eq(title)
    })
})
