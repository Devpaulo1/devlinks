import { test, expect } from '@playwright/test'

const MAIN_LINKS = [
  { text: 'Inscreva-se no Curso', href: 'https://www.rocketseat.com.br/formacao/fullstack' },
  { text: 'Baixe meu e-book', href: 'https://www.rocketseat.com.br/ebook' },
  { text: 'Veja meu portfólio', href: 'https://github.com/Devpaulo1' },
  { text: 'Conheça meu curso', href: 'https://www.rocketseat.com.br/' },
]

const SOCIAL_LINKS = [
  { label: 'GitHub', href: 'https://github.com/Devpaulo1' },
  { label: 'Instagram', href: 'https://www.instagram.com/rocketseat/' },
  { label: 'YouTube', href: 'https://www.youtube.com/@KillRockts' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/devpaulo1/' },
]

test('carrega a página sem erros e sem rolagem horizontal', async ({ page }, testInfo) => {
  const errors = []
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text())
  })
  page.on('pageerror', (error) => errors.push(error.message))

  await page.goto('/')

  await expect(page).toHaveTitle('DevLinks')
  await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR')
  await expect(page.getByRole('img', { name: /avatar/i })).toBeVisible()
  await expect(page.getByRole('heading', { level: 1 })).toContainText('@')

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  )
  expect(overflow, 'a página não deve ter rolagem horizontal').toBe(0)

  await page.screenshot({
    path: `docs/evidencias/playwright-${testInfo.project.name}-dark.png`,
    fullPage: true,
  })

  expect(errors).toEqual([])
})

test('todos os links e redes sociais apontam para os destinos corretos', async ({ page }) => {
  await page.goto('/')

  const buttons = page.locator('.link-button')
  await expect(buttons).toHaveCount(MAIN_LINKS.length)

  for (const [index, link] of MAIN_LINKS.entries()) {
    const button = buttons.nth(index)
    await expect(button).toHaveText(link.text)
    await expect(button).toHaveAttribute('href', link.href)
    await expect(button).toHaveAttribute('target', '_blank')
    await expect(button).toHaveAttribute('rel', /noopener/)
    await expect(button).toHaveAttribute('rel', /noreferrer/)
  }

  const socials = page.locator('.social-links__link')
  await expect(socials).toHaveCount(SOCIAL_LINKS.length)

  for (const [index, link] of SOCIAL_LINKS.entries()) {
    const social = socials.nth(index)
    await expect(social).toHaveAttribute('aria-label', link.label)
    await expect(social).toHaveAttribute('href', link.href)
  }

  await expect(page.locator('a[href="#"]')).toHaveCount(0)
})

test('alterna o tema e mantém a preferência após recarregar', async ({ page }, testInfo) => {
  await page.goto('/')

  const html = page.locator('html')
  const toggle = page.getByRole('switch')
  const storedTheme = () =>
    page.evaluate(() => window.localStorage.getItem('devlinks-theme'))

  await expect(html).toHaveAttribute('data-theme', 'dark')
  await expect(toggle).toHaveAttribute('aria-checked', 'false')

  await toggle.click()

  await expect(html).toHaveAttribute('data-theme', 'light')
  await expect(toggle).toHaveAttribute('aria-checked', 'true')
  await expect.poll(storedTheme).toBe('light')

  await page.screenshot({
    path: `docs/evidencias/playwright-${testInfo.project.name}-light.png`,
    fullPage: true,
  })

  await page.reload()

  await expect(html).toHaveAttribute('data-theme', 'light')
  await expect(toggle).toHaveAttribute('aria-checked', 'true')
  expect(await storedTheme()).toBe('light')
})
