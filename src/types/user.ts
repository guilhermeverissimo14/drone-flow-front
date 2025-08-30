export interface UserType {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone: string;
  cpfCnpj: string;
  avatar: string;
  lastLogin: string;
}

export interface LoginResponse {
  token: string;
  user: UserType;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export type UserRole =
  | "ADMIN"
  | "MANAGER"
  | "LOCAL_MANAGER"
  | "FINANCIAL"
  | "PILOT"
  | "ASSISTANT";