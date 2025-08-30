import type { UserType } from "@/types/user";
import { createContext } from "react";
export interface AuthContextType {
  user: UserType | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isProspector: boolean;
  isSuperAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
