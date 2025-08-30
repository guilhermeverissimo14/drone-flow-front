import type { LoginRequest, LoginResponse, UserType } from "@/types/user";
import { api } from "./api";

export const saveAuthData = (data: LoginResponse) => {
  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));

  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 7);

  document.cookie = `token=${data.token}; expires=${expirationDate.toUTCString()}; path=/`;
  document.cookie = `user=${JSON.stringify(data.user)}; expires=${expirationDate.toUTCString()}; path=/`;
};

export const clearAuthData = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};

export const getAuthData = (): { token: string | null; user: UserType | null } => {
  const token = localStorage.getItem("token");
  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;

  return { token, user };
};

export const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>("/auth/login", credentials);

  saveAuthData(response.data);

  return response.data;
};

export const logout = async () => {
  clearAuthData();
};

export const isAuthenticated = (): boolean => {
  const { token } = getAuthData();
  return !!token;
};

export const isProspector = (): boolean => {
  const { user } = getAuthData();
  return user?.role === "MANAGER";
};

export const isSuperAdmin = (): boolean => {
  const { user } = getAuthData();
  return user?.role === "ADMIN";
};
