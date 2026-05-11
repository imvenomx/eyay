import {test, expect} from '@playwright/test'

test('homepage loads and shows the hero heading', async ({page}) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Eey Aay/i)
    // Footer should always be present
    await expect(page.getByRole('contentinfo')).toBeVisible({timeout: 10_000})
})

test('blog index loads', async ({page}) => {
    await page.goto('/blog')
    await expect(page.getByRole('heading', {level: 1})).toBeVisible()
})

test('case-studies index loads', async ({page}) => {
    await page.goto('/case-studies')
    await expect(page.getByRole('heading', {level: 1})).toBeVisible()
})

test('contact page renders the form', async ({page}) => {
    await page.goto('/contact')
    await expect(page.getByLabel(/email/i)).toBeVisible()
    await expect(page.getByRole('button', {name: /invia|send/i})).toBeVisible()
})

test('404 page is branded', async ({page}) => {
    const res = await page.goto('/this-page-does-not-exist')
    expect(res?.status()).toBe(404)
    await expect(page.getByText('404')).toBeVisible()
})
