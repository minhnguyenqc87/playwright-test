import { Page } from "@playwright/test";

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(url: string) {
    if (!url) {
      throw new Error("URL is undefined");
    }
    await this.page.goto(url);
  }

  async fillField(selector: string, value: string) {
    await this.page.waitForSelector(selector);
    await this.page.fill(selector, value);
  }

  async clickElement(selector: string) {
    await this.page.waitForSelector(selector);
    await this.page.click(selector);
  }

  async getTextContent(selector: string): Promise<string | null> {
    await this.page.waitForSelector(selector);
    return await this.page.textContent(selector);
  }

  async selectDropdownOption(selector: string,value: string) {
    //await this.page.click(selector); // Hmmm, i will update this line later lol
    await this.page.waitForSelector(selector);
    await this.page.selectOption(selector, value);
  }

  /**
   * Click a button or element based on text content or selector
   * Uses Playwright's built-in waiting mechanisms
   * @param value - The text content or selector of the element to click
   * @param options - Optional parameters
   * @returns Promise<void>
   */
  async clickButton(
    value: string,
    options: {
      selector?: string;
      arrayIndex?: number;
      timeout?: number;
    } = {}
  ): Promise<void> {
    const {
      selector = "button, a, i",
      arrayIndex = 0,
      timeout = 600,
    } = options;

    // Set timeout for this operation
    await this.page.waitForSelector(selector, { timeout });

    try {
      // Check if value is a selector (starts with . or # or [)
      if ([".", "#", "["].includes(value[0])) {
        // Wait for the selector to be visible
        await this.page.waitForSelector(value, { timeout });

        const elements = await this.page.$$(value);
        if (elements[arrayIndex]) {
          // Ensure element is visible and ready for interaction
          await elements[arrayIndex].waitForElementState("visible");
          await elements[arrayIndex].focus();
          await elements[arrayIndex].click();
        } else {
          throw new Error(
            `Element at index ${arrayIndex} not found for selector '${value}'`
          );
        }
      } else {
        // For text-based lookup, we need to ensure the container elements are ready
        await this.page.waitForSelector(selector, { timeout });

        // Treat it as text and find the corresponding element
        await this.page.$$eval(
          selector,
          (options: (HTMLElement | SVGElement)[], textV: string) => {
            const ele = options.find(
              (option) =>
                option.textContent?.trim() === textV ||
                (option as HTMLInputElement).value === textV
            );
            if (ele) (ele as HTMLElement).click();
          },
          value
        );
      }
    } catch (error: any) {
      throw new Error(
        `This selector or text '${value}' is not clickable: ${error.message}`
      );
    }

    // Wait a bit after clicking to allow for any animations or state changes
    await this.page.waitForSelector(selector, { timeout });
  }

  /**
   * Check if element is visible
   * @param selector - Element selector
   * @returns boolean indicating if element is visible
   */
  async isElementVisible(selector: string): Promise<boolean> {
    const element = await this.page.$(selector);
    return element !== null && (await element.isVisible());
  }
}
