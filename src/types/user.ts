export interface UserType {
  id: string;
  name: string;
  email: string;
  role: "SUPER_ADMIN" | "PROSPECTOR";
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