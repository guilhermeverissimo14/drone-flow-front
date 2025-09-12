import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { useMutation } from "@tanstack/react-query";
import { AuthContext, type AuthContextType } from "./auth";
import { login as apiLogin, logout as apiLogout, getAuthData, isSuperAdmin as checkIsSuperAdmin, isManager as checkIsProspector } from "@/services/auth/auth";
import type { UserType } from "@/types/user";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      try {
        const { user: storedUser, token } = getAuthData();

        if (storedUser && token) {
          setUser(storedUser);
        }
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error);
        localStorage.removeItem("G:user");
        localStorage.removeItem("G:token");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const loginMutation = useMutation({
    mutationFn: apiLogin,
    onSuccess: (data) => {
      setUser(data.user);
    },
    onError: (error) => {
      console.error("Erro no login:", error);
    },
  });

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      await loginMutation.mutateAsync({ email, password });
      return true;
    } catch {
      return false;
    }
  };

  const logout = async () => {
    try {
      await apiLogout();
    } catch (error) {
      console.error("Erro no logout:", error);
    } finally {
      setUser(null);
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading: isLoading || loginMutation.isPending,
    isProspector: checkIsProspector(),
    isSuperAdmin: checkIsSuperAdmin(),
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
