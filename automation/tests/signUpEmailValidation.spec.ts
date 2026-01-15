import { test, expect } from '@playwright/test';
import { SignUpPage } from '../src/pageObjects/SignUpPage';
import type { SignUpFormData, SignUpFormDataWithoutEmail } from '../src/types/SignUpFormData';

let signUpPage: SignUpPage;

const baseUser: SignUpFormDataWithoutEmail = {
  fullName: 'Test Testov',
  jobTitle: 'Test JT',
  phone: '7777777',
};

const invalidEmails = [
  'plainaddress',
  '@domain.com',
  'user@',
  'user@domain',
  'user@domain.',
  'user@domain,com',
  'user domain.com',
];

test.describe('Sign-up form: Email validation', () => {
  test.beforeEach(async ({ page }) => {
    signUpPage = new SignUpPage(page);
    await signUpPage.goto();
    await signUpPage.waitLoaded();
  });

  test('Shows an error when Email field is empty', async ({ page }) => {
    await signUpPage.fillRequiredFieldsExceptEmail(baseUser);
    await signUpPage.submit();

    await expect(signUpPage.emailErrorAlert).toBeVisible();
    await expect(signUpPage.emailErrorAlert).toHaveText(/required/i);
  });

  test('Shows "Wrong email format" error for invalid email formats', async ({ page }) => {
    for (const email of invalidEmails) {
      await test.step(`invalid email: ${email}`, async () => {
      await signUpPage.goto();
      await signUpPage.waitLoaded();

      await signUpPage.fillRequiredFieldsExceptEmail(baseUser);
      await signUpPage.fillEmail(email);
      await signUpPage.submit();
      
      await expect(signUpPage.emailErrorAlert).toBeVisible();
      await expect(signUpPage.emailErrorAlert).toHaveText(/wrong email format/i);
      });
    }
  });

   test('Email error disappears after correcting invalid email', async ({ page }) => {
    const invalidEmail = 'invalid.email';
    const validEmail = `test.auto+${Date.now()}@example.com`;

    await signUpPage.fillRequiredFieldsExceptEmail(baseUser);
    await signUpPage.fillEmail(invalidEmail);
    await signUpPage.submit();

    await expect(signUpPage.emailErrorAlert).toBeVisible();
    await expect(signUpPage.emailErrorAlert).toHaveText(/wrong email format/i);

    await signUpPage.fillEmail(validEmail);
    await signUpPage.submit();

    await expect(signUpPage.emailErrorAlert).not.toBeVisible();
  });

  test('Does not show email error for a valid email', async ({ page }) => {
    const validUser: SignUpFormData = {
      ...baseUser,
      email: `test.auto+${Date.now()}@example.com`,
    };

    await signUpPage.fillSignUpForm(validUser);
    await signUpPage.submit();

    await expect(signUpPage.emailErrorAlert).not.toBeVisible();
  });
});
