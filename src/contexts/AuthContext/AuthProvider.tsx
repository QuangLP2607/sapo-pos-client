import { type ReactNode, useCallback, useEffect, useState } from "react";
import userApi from "@services/userService";
import type { User } from "@interfaces/user";
import { AuthContext } from "./AuthContext";

interface Props {
  children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("token")
  );
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });
  const [isSignedIn, setIsSignedIn] = useState(!!token && !!user);
  const [isLoading, setIsLoading] = useState(false);

  // ================= LOGOUT =================
  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);
    setIsSignedIn(false);
  }, []);

  // ================= FETCH PROFILE =================
  const fetchUserProfile = useCallback(async () => {
    if (!token) return;

    setIsLoading(true);
    try {
      const res = await userApi.getProfile();
      const fetchedUser = res.data as User;
      setUser(fetchedUser);
      localStorage.setItem("user", JSON.stringify(fetchedUser));
    } catch (err) {
      console.error(" Cannot fetch profile:", err);
      logout();
    } finally {
      setIsLoading(false);
    }
  }, [token, logout]);

  // ================= LOGIN =================
  const login = useCallback(
    async (accessToken: string) => {
      setToken(accessToken);
      setIsSignedIn(true);
      localStorage.setItem("token", accessToken);

      await fetchUserProfile();

      // const mockUser: User = {
      //   username: "mockuser",
      //   phoneNum: "0123456789",
      //   role: "SALES",
      // };

      // setUser(mockUser);

      // localStorage.setItem("user", JSON.stringify(mockUser));
    },
    [fetchUserProfile]
  );

  // ================= LOAD USER ON APP START =================
  useEffect(() => {
    if (token && !user && !isLoading) {
      fetchUserProfile();
    }
  }, [token, user, isLoading, fetchUserProfile]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isSignedIn,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
