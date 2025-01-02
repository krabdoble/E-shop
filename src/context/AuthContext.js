import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, googleProvider } from "../config/firebase";
import { signInWithPopup, signOut } from "firebase/auth";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("firebaseToken");
    if (token) {
      // Aquí puedes verificar el token con el backend si es necesario
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, []);

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const token = result._tokenResponse.idToken;

      // Guardar el usuario y el token en localStorage
      localStorage.setItem("firebaseToken", token);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      localStorage.removeItem("firebaseToken");
      localStorage.removeItem("user");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
