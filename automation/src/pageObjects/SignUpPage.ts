import { Page, Locator } from '@playwright/test';
import { SignUpFormData, SignUpFormDataWithoutEmail } from '../types/SignUpFormData';

export class SignUpPage {
  readonly page: Page;

  readonly fullNameInput: Locator;
  readonly emailInput: Locator;
  readonly jobTitleInput: Locator;
  readonly phoneInput: Locator;
  readonly submitButton: Locator;
  readonly emailErrorAlert: Locator;

  constructor(page: Page) {
    this.page = page;

    //form fields
    this.fullNameInput = page.getByTestId('SignUpForm__Name--Input');
    this.emailInput    = page.getByTestId('SignUpForm__Email--Input');
    this.jobTitleInput = page.getByTestId('SignUpForm__JobTitle--Input');
    this.phoneInput    = page.getByTestId('SignUpForm__Phone--Input');
    //buttons
    this.submitButton  = page.getByTestId('SignUpForm__Submit--Button');

    //error alert for Email field
    this.emailErrorAlert = page
      .getByTestId('SignUpForm__Email')
      .getByRole('alert');
  }

  async goto(): Promise<void>{
  //baseURL defined in Playwright config: baseURL = 'https://get.preprod.xometry.eu'
  await this.page.goto('/sign_up', { waitUntil: 'domcontentloaded'});
  }
  async waitLoaded(): Promise<void> {
    await this.submitButton.waitFor({ state: 'visible' });
  }

  async fillRequiredFieldsExceptEmail(data: SignUpFormDataWithoutEmail): Promise<void> {
    await this.fullNameInput.fill(data.fullName);
    await this.jobTitleInput.fill(data.jobTitle);
    await this.phoneInput.fill(data.phone);
  }

  async fillEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
  }

  async fillSignUpForm(data: SignUpFormData):Promise<void> {
    await this.fullNameInput.fill(data.fullName);
    await this.jobTitleInput.fill(data.jobTitle);
    await this.phoneInput.fill(data.phone);
    await this.emailInput.fill(data.email);
  }

  async submit(): Promise<void> {
    await this.submitButton.click();
  }

}
