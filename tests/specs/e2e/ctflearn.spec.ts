import { LoginPage } from "../../pages/loginPage";
import { ChallengePage } from "../../pages/challengePage";
import { loginData } from "../../core/models/loginData";
import { testChallenge } from "../../core/models/challengeData";

test.describe("CTFLearn E2E Test Flow", () => {
  let loginPage: LoginPage;
  let challengePage: ChallengePage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    challengePage = new ChallengePage(page);
  });
  
  test("should create a challenge and verify it appears in My Challenges", async () => {
    // Step 1: Login to CTFLearn
    await loginPage.navigate("https://ctflearn.com/user/login");
    await loginPage.login(loginData.valid.username, loginData.valid.password);
    
    const isLoginSuccessful = await loginPage.isLoginSuccessful(loginData.valid.expectedUrl);
    expect(isLoginSuccessful).toBeTruthy();
    console.log("Login successful");
    
    // Step 2: Navigate to Challenges → Create Challenge
    await challengePage.navigateToCreateChallenge();
    console.log("Navigated to Create Challenge page");
    
    // Step 3: Create a challenge
    await challengePage.createChallenge(
      testChallenge.title,
      testChallenge.category,
      testChallenge.points,
      testChallenge.description,
      testChallenge.flag
    );
    console.log("Challenge created with title:", testChallenge.title);
    
    // Step 4: Open My Challenge and verify created challenge is displayed
    await challengePage.navigateToMyChallenges();
    console.log("Navigated to My Challenges");
    
    const isChallengeVisible = await challengePage.isChallengeVisible(testChallenge.title);
    console.log("Challenge visible:", isChallengeVisible);
    expect(isChallengeVisible).toBeTruthy();
    console.log("Challenge verified in My Challenges");
    
    // Step 5: Logout
    await challengePage.logout();
    console.log("Logged out successfully");
  });
}); 