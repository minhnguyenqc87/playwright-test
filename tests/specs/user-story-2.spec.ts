import { UserApiService } from "tests/api/services/UserApiService";
import { userData } from "tests/core/models/userData";

test.describe("Reqres API Tests with Playwright", () => {
  // Global variable setup
  let userApiService: UserApiService;

  test.beforeEach(async ({ request }) => {
    userApiService = new UserApiService(request);
  });

  test.describe("Login Tests", () => {
    test("should successfully login with valid credentials", async () => {
      const response = await userApiService.loginViaApi(
        userData.validUser.email,
        userData.validUser.password
      );
      // const response = await userApiService.login(validLoginData.email, validLoginData.password);
      expect(response.status).toBe(200);
      expect(response.data).toBeDefined();
      expect(response.data?.token).toBeDefined();
      expect(response.error).toBeUndefined();

      // Store token for subsequent requests
      if (response.data?.token) {
        userApiService.setToken(response.data.token);
      }
    });
  });

  test.describe("Get User Tests", () => {
    test("should successfully get existing user", async () => {
      const response = await userApiService.getUser(userData.validUser.id);
      console.log(response);
      console.log(response.data);
      expect(response.status).toBe(200);
      expect(response.data).toBeDefined();
      expect(response.data?.data).toBeDefined();
      expect(response.data?.data.id).toBe(userData.validUser.id);
      expect(response.data?.data.email).toBeDefined();
      expect(response.data?.data.first_name).toBeDefined();
      expect(response.data?.data.last_name).toBeDefined();
      expect(response.error).toBeUndefined();
    });

    test("should return 404 for non-existent user", async () => {
      const response = await userApiService.getUser(userData.invalidUser.id);

      expect(response.status).toBe(404);
      expect(response.data).toBeUndefined();
      expect(response.error).toBeDefined();
    });

    test("should handle invalid user ID", async () => {
      const response = await userApiService.getUser(userData.invalidUser.id);
      console.log(response.data);
      expect(response.status).not.toBe(200);
      expect(response.data).toBeUndefined();
      expect(response.error).toBeDefined();
    });
  });

  test.describe("Update User Tests", () => {
    test("should successfully update user", async () => {
      // First login to get token
      const loginResponse = await userApiService.login(
        userData.validUser.email,
        userData.validUser.password
      );
      if (loginResponse.data?.token) {
        userApiService.setToken(loginResponse.data.token);
      }

      const response = await userApiService.updateUser(
        userData.updateUser.id,
        userData.updateUser.updateData
      );
      expect(response.status).toBe(200);
      expect(response.data).toBeDefined();
      expect(response.data?.name).toBe(userData.updateUser.updateData.name);
      expect(response.data?.job).toBe(userData.updateUser.updateData.job);
      expect(response.data?.updatedAt).toBeDefined();
      expect(response.error).toBeUndefined();
    });

    test("should handle update only name", async () => {
      const updateName = { name: "John Partial" };
      const response = await userApiService.updateUser(
        userData.updateUser.id,
        updateName
      );
      expect(response.status).toBe(200);
      expect(response.data).toBeDefined();
      expect(response.data?.name).toBe(updateName.name);
      expect(response.data?.updatedAt).toBeDefined();
      expect(response.error).toBeUndefined();
    });
  });
});
