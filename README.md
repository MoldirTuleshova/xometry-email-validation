# Xometry Test Assignment - Email Validation (Playwright)

This repository contains automated tests for validating Email field 
on the Xometry sign up form using **Playwright + TypeScript** with the Page Object Model (POM).

## Scope

The goal is to cover client-side validation of Email field on the sign up page:
'/sign_up' (base URL is configured in Playwright config, e.g. 'https://get.preprod.xometry.eu').

Original assignment: 
    Write an automated test (preferably in TypeScript) that validates the Email field
    on the registration form: https://get.preprod.xometry.eu/sign_up

    Напишите автотест на Typescript (желательно), который проверяет валидацию поля Email в форме регистрации: https://get.preprod.xometry.eu/sign_up

## Validation scenarios covered:
1. **Required field**  
   - When Email is empty and the form is submitted -> a “Required” validation error is shown.
2. **Invalid email format validation**  
   - Several invalid email formats are tested (missing `@`, missing domain, etc.).
   - The form shows a “Wrong email format” error for invalid inputs.
3. **Error disappears after correcting invalid email**  
   - User enters an invalid email -> sees an error.
   - After correcting email to a valid value and submitting again -> error disappears.
4. **Valid email does not trigger validation errors**  
   - For a valid email, the form is submitted without showing email validation errors.

## Out of scope
Not included intentionally:

- Account creation/backend signup
- Email confirmation flow
- Phone/Name/Job Title validation
- Auth/login flows

Focus remains strictly on Email field to match the assignment.

## Project structure
automation/
  src/
    pageObjects/
      SignUpPage.ts                    # Page Object for the sign-up form
    types/
      SignUpFormData.ts                # Type-safe form data models
    tests/
      signUpEmailValidation.spec.ts    # Test suite for email validation
  playwright.config.ts                 # Base URL and config
  package.json                         # Dependencies and scripts
  README.md                            # Assignment description

