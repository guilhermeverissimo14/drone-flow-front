import { createContext } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "SUPER_ADMIN" | "PROSPECTOR";
  phone: string;
  cpfCnpj: string;
  avatar: string;
  lastLogin: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isProspector: boolean;
  isSuperAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
