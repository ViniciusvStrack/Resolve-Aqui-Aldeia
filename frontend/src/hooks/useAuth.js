import { createContext, useContext, useState } from "react";
import api from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [profissional, setProfissional] = useState(() => {
    const salvo = localStorage.getItem("profissional");
    return salvo ? JSON.parse(salvo) : null;
  });

  const login = async (email, senha) => {
    const { data } = await api.post("/auth/login", { email, senha });
    localStorage.setItem("token", data.token);
    localStorage.setItem("profissional", JSON.stringify(data.profissional));
    setProfissional(data.profissional);
    return data;
  };

  const registrar = async (dados) => {
    const { data } = await api.post("/auth/registro", dados);
    localStorage.setItem("token", data.token);
    localStorage.setItem("profissional", JSON.stringify(data.profissional));
    setProfissional(data.profissional);
    return data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("profissional");
    setProfissional(null);
  };

  return (
    <AuthContext.Provider value={{ profissional, login, registrar, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
