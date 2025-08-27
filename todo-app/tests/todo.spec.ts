import { test, expect } from '@playwright/test';

test('should allow a user to add and delete a todo', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Add a todo
  await page.getByPlaceholder(/Name/i).fill('Test Todo');
  await page.getByPlaceholder(/Description/i).fill('Test Description');
  await page.getByTestId('date-input').fill('2023-01-01T12:00');
  await page.getByText(/Add Todo/i).click();

  await expect(page.getByText(/Test Todo/i)).toBeVisible();
  await expect(page.getByText(/Test Description/i)).toBeVisible();

  // Delete the todo
  await page.locator(`#delete-button-0`).click();
  await expect(page.getByText(/Test Todo/i)).not.toBeVisible();
});

test('should allow a user to terminate a todo', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Add a todo
  await page.getByPlaceholder(/Name/i).fill('Test Todo');
  await page.getByPlaceholder(/Description/i).fill('Test Description');
  await page.getByTestId('date-input').fill('2023-01-01T12:00');
  await page.getByText(/Add Todo/i).click();

  await expect(page.getByText(/Test Todo/i)).toBeVisible();

  // Terminate the todo
  await page.locator(`#terminate-button-0`).click();
  const todoItem = await page.locator('li').filter({ hasText: 'Test Todo' });
  await expect(todoItem).toHaveClass(/bg-green-200/);
});
