import { Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class LoginPage extends BasePage {
  // Selectors
  private readonly usernameInput = "#identifier";
  private readonly passwordInput = "#password";
  private readonly loginButton = "button[type='submit']";
  private readonly errorMessage = ".invalid-feedback";

  constructor(page: Page) {
    super(page);
  }

  /**
   * Login with the provided credentials
   * @param username - Username to login with
   * @param password - Password to login with
   */
  async login(username: string, password: string) {
    console.log("Attempting to login with:", { username, password });

    // Wait for form elements to be ready
    await this.page.waitForSelector(this.usernameInput);
    await this.page.waitForSelector(this.passwordInput);
    await this.page.waitForSelector(this.loginButton);

    await this.fillField(this.usernameInput, username);
    await this.fillField(this.passwordInput, password);

    console.log("Form filled, clicking submit button");
    await this.clickElement(this.loginButton);
  }

  /**
   * Get validation message for a field
   * @param fieldSelector - The selector for the field
   * @returns The validation message if present
   */
  async getFieldValidationMessage(fieldSelector: string): Promise<string> {
    await this.page.waitForSelector(fieldSelector);
    const element = await this.page.$(fieldSelector);
    if (element) {
      return (
        (await element.evaluate(
          (el) => (el as HTMLInputElement).validationMessage
        )) || ""
      );
    }
    return "";
  }

  /**
   * Get error message text if present
   * @returns Error message text or null if no error
   */
  async getErrorMessage(): Promise<string | null> {
    await this.page.waitForSelector(this.errorMessage);
    // Check for error message element
    if (await this.isElementVisible(this.errorMessage)) {
      const error = await this.getTextContent(this.errorMessage);
      console.log("Error message found:", error);
      return error;
    }
    console.log("No error message found");
    return null;
  }

  // login successful
  async isLoginSuccessful(expectedUrl?: string): Promise<boolean> {
    try {
      // Wait for navigation to complete
      await this.page.waitForLoadState("networkidle", { timeout: 5000 });

      // Check for error message first
      const hasError = await this.isElementVisible(this.errorMessage);
      if (hasError) {
        return false;
      }

      // If expectedUrl provided, check URL
      if (expectedUrl) {
        const currentUrl = this.page.url();
        return (
          currentUrl.includes("/dashboard") || currentUrl.includes(expectedUrl)
        );
      }

      // Default success check - no error message
      return true;
    } catch (error) {
      console.error("Login check failed:", error);
      return false;
    }
  }
}
