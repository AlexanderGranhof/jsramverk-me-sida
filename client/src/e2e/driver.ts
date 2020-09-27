import webdriver, { WebDriver, By, Key } from 'selenium-webdriver'
import firefox from 'selenium-webdriver/firefox'
import { Context } from 'mocha'

export const domain = 'https://algn18.me'

export default async () => {
    const screen = {
        width: 1920,
        height: 1080,
    }

    const firefoxOptions = new firefox.Options().headless().windowSize(screen)
    const driver = new webdriver.Builder()
        .forBrowser('firefox')
        .setFirefoxOptions(firefoxOptions)
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

    await driver.sleep(1000)
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
