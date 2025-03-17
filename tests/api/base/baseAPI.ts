import { APIRequestContext, APIResponse } from "@playwright/test";
const env = (process.env.ENVIRONMENT || "dev").toUpperCase();

export interface UserResponse {
  id?: number;
  email?: string;
  first_name?: string;
  last_name?: string;
  avatar?: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  status: number;
}
export class BaseAPI {
  protected baseUrl = process.env[`${env}_API_URL`];
  protected token: string = "";
  protected request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  setToken(token: string): void {
    this.token = token;
  }

  getToken(): string {
    return this.token;
  }

  protected getAuthHeaders(): Record<string, string> {
    return this.token ? { Authorization: `Bearer ${this.token}` } : {};
  }

  async login(
    email: string,
    password: string
  ): Promise<ApiResponse<{ token?: string }>> {
    console.log(`${this.baseUrl}/login`);
    const response = await this.request.post(`${this.baseUrl}/login`, {
      data: { email, password },
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...this.getAuthHeaders(),
      },
    });

    return this.handleResponse<{ token?: string }>(response);
  }

  async getUser(id: number): Promise<ApiResponse<{ data: UserResponse }>> {
    const response = await this.request.get(`${this.baseUrl}/users/${id}`, {
      headers: {
        Accept: "application/json",
        ...this.getAuthHeaders(),
      },
    });
    return this.handleResponse<{ data: UserResponse }>(response);
  }

  async updateUser(
    id: number,
    data: Record<string, any>
  ): Promise<ApiResponse<Record<string, any>>> {
    const response = await this.request.put(`${this.baseUrl}/users/${id}`, {
      data,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...this.getAuthHeaders(),
      },
    });

    return this.handleResponse<Record<string, any>>(response);
  }

  /**
   * List users
   * @param page The page number
   * @returns The API response
   */
  async listUsers(
    page: number = 1
  ): Promise<ApiResponse<{ data: UserResponse[] }>> {
    const response = await this.request.get(`${this.baseUrl}/users`, {
      params: { page },
      headers: {
        Accept: "application/json",
        ...this.getAuthHeaders(),
      },
    });

    return this.handleResponse<{ data: UserResponse[] }>(response);
  }

  protected async handleResponse<T>(
    response: APIResponse
  ): Promise<ApiResponse<T>> {
    const status = response.status();

    try {
      if (response.headers()["content-type"]?.includes("application/json")) {
        const data = await response.json();
        return {
          data: response.ok() ? data : undefined,
          error: !response.ok()
            ? this.getErrorMessage(data, status)
            : undefined,
          status,
        };
      }

      const text = await response.text();
      return {
        data: undefined,
        error: text || `Request failed with status ${status}`,
        status,
      };
    } catch (error) {
      return {
        data: undefined,
        error: `Failed to parse response: ${error}`,
        status,
      };
    }
  }

  private getErrorMessage(data: any, status: number): string {
    if (data && data.error) {
      return data.error;
    }
    switch (status) {
      case 400:
        return "Bad Request";
      case 401:
        return "Unauthorized";
      case 403:
        return "Forbidden";
      case 404:
        return "Not Found";
      case 500:
        return "Internal Server Error";
      default:
        return `Request failed with status ${status}`;
    }
  }
}
