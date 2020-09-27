import webdriver, { WebDriver, By } from 'selenium-webdriver'
import chrome from 'selenium-webdriver/chrome'
import { Context } from 'mocha'

export default async () => {
    const screen = {
        width: 1920,
        height: 1080,
    }

    const chromeOptions = new chrome.Options().headless().windowSize(screen)
    const driver = new webdriver.Builder()
        .forBrowser('chrome')
        .setChromeOptions(chromeOptions)
        .build()

    return driver
}

export const signIn = (driver: WebDriver) => async () => {
    const signIn = await driver.findElement(By.css('nav li:last-child'))

    await signIn.click()

    const form = await driver.findElement(By.css('[class^="signin_register-form"] form'))
    const [username, password, submit] = await form.findElements(By.css('input, button'))

    await username.sendKeys('admin')
    await password.sendKeys('admin')
    await submit.click()

    await driver.sleep(500)
}

declare module 'mocha' {
    export interface Context {
        signin: () => Promise<void>
        driver: WebDriver
    }
}

export interface ExtendedMochaContext extends Context {
    signin: () => Promise<void>
    driver: WebDriver
}
