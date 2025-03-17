
import { UserApiService } from "../../api/services/UserApiService";
import { userData } from "../../core/models/userData";

test.describe("API E2E Test Flow", () => {
  let userApiService: UserApiService;

  test.beforeEach(async ({ request }) => {
    userApiService = new UserApiService(request);
  });
  test("should perform Step 1: Login via API (POST /login) properly", async () => {
    // Step 1: Login via API (POST /login)
    const responseData = await userApiService.loginViaApi(
      userData.validUser.email,
      userData.validUser.password
    );

    expect(responseData.status).toBe(200);
    expect(responseData.data?.token).toBeDefined();

    // Store token for subsequent requests
    const token = responseData.data?.token;
    expect(token).toBeTruthy();
  });
  test("should perform Step 2: Get user details (GET /users/{id}) properly", async () => {
    // Step 2: Get user details (GET /users/{id})
    const responseData = await userApiService.getUserDetails(userData.validUser.id);

    expect(responseData.status).toBe(200);
    expect(responseData.data?.data).toBeDefined();

    // // Verify user data structure
    const expectedData = responseData.data?.data;
    expect(expectedData?.id).toBe(userData.validUser.id);
    expect(expectedData?.email).toBeDefined();
    expect(expectedData?.first_name).toBeDefined();
    expect(expectedData?.last_name).toBeDefined();
  });

  test("should perform Step 3: Update user details (PUT /users/{id}) properly", async () => {
    // Step 3: Update user details (PUT /users/{id})
    const updateResponse = await userApiService.updateUserDetails(
      userData.updateUser.id,
      userData.updateUser.updateData,
    );

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.data).toBeDefined();
    console.log("User details updated:", updateResponse.data);

    // Verify update data is reflected in response
    expect(updateResponse.data?.name).toBe(userData.updateUser.updateData.name);
    expect(updateResponse.data?.job).toBe(userData.updateUser.updateData.job);
  });
});
