import { createContext } from "react";
import type { User } from "@interfaces/user";

export interface AuthContextType {
  user: User | null;
  isSignedIn: boolean;
  isLoading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
