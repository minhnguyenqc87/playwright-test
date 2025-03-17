const validLoginData = {
  id: 4,
  email: "eve.holt@reqres.in",
  password: "cityslicka",
};

const invalidLoginData = {
  id: 23,
  email: "wrong@email.com",
  password: "wrongpass",
};
const validUpdateData = {
  id: 2,
  updateData: {
    name: "John Updated",
    job: "QA Engineer",
  },
};

// Export API data for easy access
export const userData = {
  validUser: validLoginData,
  invalidUser: invalidLoginData,
  updateUser: validUpdateData,
};
