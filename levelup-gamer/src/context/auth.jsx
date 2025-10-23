// src/context/auth.jsx
import { createContext, useContext, useEffect, useState } from "react";

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null); // { nombre?, email, duoc20, createdAt }

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("session");
      if (raw) setUsuario(JSON.parse(raw));
    } catch {}
  }, []);

  const login = (perfil) => {
    setUsuario(perfil);
    sessionStorage.setItem("session", JSON.stringify(perfil));
  };

  const logout = () => {
    setUsuario(null);
    sessionStorage.removeItem("session");
  };

  return (
    <AuthCtx.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthCtx.Provider>
  );
}

export function useAuth() {
  return useContext(AuthCtx);
}
