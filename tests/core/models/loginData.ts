interface LoginCredentials {
  username: string;
  password: string;
  expectedUrl?: string;
  expectedError?: string;
}

export const validLoginData: LoginCredentials = {
  username: "validUser123",
  password: "StrongPass123!",
  expectedUrl: "https://ctflearn.com/dashboard",
};

export const invalidLoginData: LoginCredentials[] = [
  {
    username: "", // Empty username
    password: "Pass123!",
    expectedError: "Please fill out this field.",
  },
  {
    username: "user123",
    password: "", // Empty password
    expectedError: "Please fill out this field.",
  },
  {
    username: "nonexistentuser",
    password: "Pass123!",
    expectedError: "User does not exist for this username",
  },
  {
    username: "validUser123",
    password: "wrongpassword",
    expectedError: "Wrong password",
  },
];

// Combined export for easy access
export const loginData = {
  valid: validLoginData,
  invalid: invalidLoginData,
};
