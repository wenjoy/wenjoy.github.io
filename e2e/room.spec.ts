import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/')
})

test('should navigate to the antechamber page to registr as default', async ({
  page,
}) => {
  await expect(page).toHaveURL('http://localhost:3000/antechamber')
})

test('should navigate to room page if fulfill required information', async ({
  page,
}) => {
  await page.fill('input#room', '88')
  await page.fill('input#username', 'test')
  await page.click('text=access')
  await expect(page).toHaveURL('http://localhost:3000/room/88')
})
