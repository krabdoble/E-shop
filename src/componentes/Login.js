import React, { useEffect } from "react";
import { useAuth } from "../providers/AuthProvider"
import { useNavigate } from "react-router-dom";
import "./estilos.css";

export const Login = () => {
  const { signInWithGoogle, user } = useAuth();
  const navigate = useNavigate();

    // Redirigir si el usuario ya está autenticado
  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]); // Dependencia de "user" y "navigate" para que se ejecute cuando el usuario cambie


  return (
    <div className="auth card text-center">
      <h1>Login</h1>
    <div className="card-body position-absolute top-50 start-50 translate-middle">
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    </div>
    </div>
  );
};

export default Login;

