import { defineConfig } from '@playwright/test'

// Usa o Chrome já instalado na máquina (channel: 'chrome'),
// então não é necessário baixar os navegadores do Playwright.
export default defineConfig({
  testDir: './tests',
  timeout: 60_000,
  reporter: [['list'], ['html', { open: 'never', outputFolder: 'playwright-report' }]],
  use: {
    baseURL: 'http://127.0.0.1:5173',
    channel: 'chrome',
    screenshot: 'only-on-failure',
  },
  webServer: {
    command: 'npm run dev -- --host 127.0.0.1 --port 5173',
    url: 'http://127.0.0.1:5173',
    reuseExistingServer: true,
    timeout: 60_000,
  },
  projects: [
    { name: 'desktop', use: { viewport: { width: 1440, height: 1024 } } },
    { name: 'mobile', use: { viewport: { width: 360, height: 800 } } },
  ],
})
