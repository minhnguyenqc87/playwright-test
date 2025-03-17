import { Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class ChallengePage extends BasePage {
  private readonly challengesMenuLink =
    "a[data-toggle='dropdown']:not([href='profile'])";
  private readonly createChallengeLink = "a[href='/challenge/create']";
  private readonly myChallengesLink = "a[href='/challenge/by/validUser123']";

  private readonly challengeTitleInput = "#title";
  private readonly challengeCategorySelect = "#category";
  private readonly challengePointsInput = "#points";
  private readonly challengeHowToSolveInput = "#howtosolve";
  private readonly challengeFlagInput = "#flag";
  private readonly submitChallengeButton = "button.btn-success";

  private readonly challengeTitle = "h1.font-primary";
  private readonly challengeItem = ".card-header";
  private readonly profileMenuLink = "a[href='profile']";
  private readonly logoutLink = "a[href='/user/logout']";

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to the Challenges page
   */
  async navigateToChallenges() {
    await this.clickElement(this.challengesMenuLink);
    await this.page.waitForLoadState("networkidle");
  }

  /**
   * Navigate to the Create Challenge page
   */
  async navigateToCreateChallenge() {
    await this.navigateToChallenges();
    await this.clickElement(this.createChallengeLink);
    await this.page.waitForLoadState("networkidle");
  }

  /**
   * Create a new challenge
   * @param title Challenge title
   * @param category Challenge category
   * @param points Challenge points
   * @param description Challenge description
   * @param flag Challenge flag (answer)
   */
  async createChallenge(
    title: string,
    category: string,
    points: string,
    description: string,
    flag: string
  ) {
    await this.fillField(this.challengeTitleInput, title);
    await this.selectDropdownOption(this.challengeCategorySelect, category);
    await this.selectDropdownOption(this.challengePointsInput, points);
    await this.fillField(this.challengeHowToSolveInput, description);
    await this.fillField(this.challengeFlagInput, flag);

    await this.clickElement(this.submitChallengeButton);
    await this.page.waitForLoadState("networkidle");
  }

  async navigateToMyChallenges() {
    await this.navigateToChallenges();
    await this.clickElement(this.myChallengesLink);
    await this.page.waitForLoadState("networkidle");
  }

  async isChallengeVisible(title: string): Promise<boolean> {
    await this.page.waitForSelector(this.challengeTitle);
    const challenges = await this.page.$$(this.challengeItem);

    for (const challenge of challenges) {
      const challengeTitle = await challenge.textContent();
      if (challengeTitle && challengeTitle.includes(title)) {
        return true;
      }
    }

    return false;
  }

  /**
   * Logout from the application
   */
  async logout() {
    await this.clickElement(this.profileMenuLink);
    await this.clickElement(this.logoutLink);
    await this.page.waitForLoadState("networkidle");
  }
}
