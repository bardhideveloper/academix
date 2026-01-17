
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { http } from "../../lib/http";

export type User = {
  id: number;
  first_name?: string;
  last_name?: string;
  email: string;
  role?: "student" | "admin";
};

type AuthState = {
  user: User | null;
  token: string | null;
  loading: boolean;
};

type AuthContextValue = {
  state: AuthState;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, first_name?: string, last_name?: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: localStorage.getItem("ax_token"),
    loading: true,
  });

  useEffect(() => {
    const bootstrap = async () => {
      try {
        if (!state.token) {
          setState((s) => ({ ...s, loading: false }));
          return;
        }

        const { data } = await http.get("/auth/me/");
        setState((s) => ({ ...s, user: data, loading: false }));
      } catch {
        localStorage.removeItem("ax_token");
        setState({ user: null, token: null, loading: false });
      }
    };

    bootstrap();
  }, [state.token]);


  const login = async (email: string, password: string) => {
    const { data } = await http.post("/auth/login/", { identifier: email, password, });
    localStorage.setItem("ax_token", data.access);
    const me = await http.get("/auth/me/");
    setState({ user: me.data, token: data.access, loading: false, });
  };

  const register = async (email: string, password: string, first_name?: string, last_name?: string) => {
    const { data } = await http.post("/auth/register/", { email, password, first_name, last_name });
    localStorage.setItem("ax_token", data.token);
    setState({ user: data.user, token: data.token, loading: false });
  };

  const logout = () => {
    localStorage.removeItem("ax_token");
    setState({ user: null, token: null, loading: false });
  };

  const value = useMemo(
    () => ({ state, login, register, logout }),
    [state]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within <AuthProvider>");
  }
  return ctx;
}
