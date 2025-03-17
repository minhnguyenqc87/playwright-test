import { test as base, expect } from '@playwright/test';

// Re-export test and expect
export { expect };


export const test = base.extend({

});

// You can also add global helper functions here
export const setupTest = () => {
  // Hmm, Thinking to set login function here
}; 