import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import api from "../services/api";
import { jwtDecode } from "jwt-decode";

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = jwtDecode(token);
        setUser(payload);
      } catch {
        localStorage.removeItem("token");
      }
    }
  }, []);

  const login = async ({ email, password }) => {
    const { data } = await api.post("/login", { email, password });
    localStorage.setItem("token", data.token);
    const payload = jwtDecode(data.token);
    setUser(payload);
    navigate("/areas-map");
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
