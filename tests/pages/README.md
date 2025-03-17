# End-to-End (E2E) Test Scenarios

This directory contains E2E test scripts for different workflows:

## 1. Web UI E2E Test Flow

**File:** `ctflearn.spec.ts`

This test covers the following workflow:
- Login to https://ctflearn.com
- Navigate to Challenges → Click Create Challenge
- Create a challenge
- Open My Challenge and verify that the created challenge is displayed correctly
- Logout

**How to run:**
```bash
yarn test:e2e
```

## 2. API E2E Test Flow

**File:** `api-flow.spec.ts`

This test covers the following workflow:
- Login via API (POST /login)
- Get user details (GET /users/{id})
- Update user details (PUT /users/{id})

**How to run:**
```bash
yarn test:api
```

## 3. Mobile App E2E Test Flow

**File:** `mobile-app.spec.ts`

This test covers the following workflow:
- Launch the mobile trading app (iOS)
- Login with valid credentials (email and password)
- Navigate to Portfolio and validate the displayed investment data
- Log out

**Note:** This test requires additional setup for mobile testing:

1. Set up Appium for mobile testing with Playwright
2. Configure an iOS simulator or real device
3. Install the trading app on the device
4. Update test configuration to connect to the mobile device

**How to run (after setup):**
```bash
yarn test:mobile
```

## Running All E2E Tests

To run all E2E tests at once:

```bash
yarn test:all-e2e
```

## Prerequisites

Before running these tests, ensure:

1. You have the correct environment variables set in the `.env` file
2. You have installed all dependencies with `yarn install`
3. For mobile tests, you have configured the mobile testing environment

## Troubleshooting

If the tests fail:
1. Check the environment variables in `.env`
2. Verify network connectivity
3. For API tests, confirm the API endpoints are accessible
4. For mobile tests, ensure the simulator/emulator is running 