import { APIRequestContext } from "@playwright/test";
import { BaseAPI } from "../base/baseAPI";

export class UserApiService extends BaseAPI {
  constructor(request: APIRequestContext) {
    super(request);
  }

  async loginViaApi(email: string, password: string) {
    const response = await this.login(email, password);
    
    if (response.data?.token) {
      this.setToken(response.data.token);
      console.log("Login successful, token received");
    } else {
      console.error("Login failed:", response.error);
    }
    
    return response;
  }

  async getUserDetails(userId: number) {
    console.log(`Getting details for user ID: ${userId}`);
    return await this.getUser(userId);
  }

  async updateUserDetails(userId: number, userData: Record<string, any>) {
    console.log(`Updating user ID: ${userId} with data:`, userData);
    return await this.updateUser(userId, userData);
  }
} 