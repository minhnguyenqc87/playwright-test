import { LoginPage } from "tests/pages/loginPage";
import { validLoginData, invalidLoginData } from "tests/core/models/loginData";

test.describe("User Story 1: CTFLearn Challenge Creation", () => {
  let loginPage: LoginPage;
  /**
  1. Open new browser for each test 
  2. Navigate to login page
 */
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    // Navigate to login page
    await loginPage.navigate("https://ctflearn.com/user/login");
  });

  //  3. Login then verify successful login
  test("should successfully login with valid credentials", async () => {
    await loginPage.login(validLoginData.username, validLoginData.password);

    // Verify successful login
    const isSuccessful = await loginPage.isLoginSuccessful(
      validLoginData.expectedUrl
    );
    expect(isSuccessful).toBeTruthy(); // It must be true :D
  });

  //  4. Login then verify validation message for empty username
  test("should show validation message for empty username", async () => {
    const testData = invalidLoginData[0];
    await loginPage.login(testData.username, testData.password);
    const validationMessage = await loginPage.getFieldValidationMessage(
      "#identifier"
    );
    expect(validationMessage).toBe(testData.expectedError);
  });

  //  5. Login then verify validation message for empty password
  test("should show validation message for empty password", async ({
    page,
  }) => {
    const testData = invalidLoginData[1];
    await loginPage.login(testData.username, testData.password);
    const validationMessage = await loginPage.getFieldValidationMessage(
      "#password"
    );
    expect(validationMessage).toBe(testData.expectedError);
  });

  //  6. Login then verify for invalid username
  test("should show error for non-existent user", async () => {
    const testData = invalidLoginData[2];
    await loginPage.login(testData.username, testData.password);
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toBe(testData.expectedError);
  });

  //  7. Login then verify for invalid password
  test("should show error for wrong password", async () => {
    const testData = invalidLoginData[3];
    await loginPage.login(testData.username, testData.password);

    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toBe(testData.expectedError);
  });
});
