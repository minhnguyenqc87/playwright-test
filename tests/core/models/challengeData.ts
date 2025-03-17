import { randomNumbers, randomItem } from "../helpers/random";

interface ChallengeData {
  title: string;
  category: string;
  points: string;
  description: string;
  flag: string;
}

/**
 * Test data for creating challenges
 */
export const testChallenge: ChallengeData = {
  title: `Test Challenge ${randomNumbers(8, 0)}`,
  category: "Binary",
  points: randomItem(["10", "20", "30", "40", "50"]),
  description: "This is a test challenge created by automated testing",
  flag: `CTFlearn{${randomNumbers(4, 0)}}`,
};

// Export challenge data for ease of use
export const challengeData = {
  test: testChallenge,
};
