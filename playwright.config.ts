import {defineConfig, devices} from '@playwright/test'

const PORT = Number(process.env.PORT || 3000)
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`

export default defineConfig({
    testDir: './tests/e2e',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    reporter: 'list',
    use: {
        baseURL: BASE_URL,
        trace: 'on-first-retry',
    },
    projects: [
        {name: 'chromium', use: {...devices['Desktop Chrome']}},
    ],
    webServer: process.env.PLAYWRIGHT_NO_SERVER ? undefined : {
        command: `ADMIN_PASSWORD=test npm run dev -- -p ${PORT}`,
        url: BASE_URL,
        timeout: 60_000,
        reuseExistingServer: !process.env.CI,
    },
})
