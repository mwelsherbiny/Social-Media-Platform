import { AuthContext } from "../contexts/AuthContext";
import useStorage from "@/hooks/useStorage.js";
import authService from "@/services/authService.js";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function AuthProvider({ children }) {
  const [user, setUser] = useStorage("user");
  const [token, setToken] = useStorage("token");
  const navigate = useNavigate();

  useEffect(() => {
    function syncWithStorage() {
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("token");

      setUser(storedUser ? JSON.parse(storedUser) : null);
      setToken(storedToken ? storedToken : null);
    }

    window.addEventListener("storage", syncWithStorage);
    return () => window.removeEventListener("storage", syncWithStorage);
  }, [setUser, setToken]);

  const setAuthData = ({ user, token }) => {
    setUser(user);
    setToken(token);
  };

  const login = async (data) => {
    const result = await authService.login(data);
    setAuthData(result);
  };

  const register = async (data) => {
    const result = await authService.register(data);
    setAuthData(result);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, setUser, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
