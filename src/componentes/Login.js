/*import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';




export const Login = () => {
  
  useEffect(() => {
    const token = localStorage.getItem("firebaseToken");

    if (token) {
      navigate("/home");
    }
  }, []);

  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    try {
      const a = await signInWithPopup(auth, googleProvider);
      const user = a.user;
      //setUser(user);
      
      
      let r= await axios.post("https://tp-back-production.up.railway.app/api/login",{
        firebaseToken: a._tokenResponse.idToken,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL
      })

      if (!r.data.ok){
        console.log(r)
        logout()
      }
      else {
      localStorage.setItem("firebaseToken", a._tokenResponse.idToken);

      navigate("/home");
    }
    } catch (error) {
      console.error(error);
    }
  };


  const logout = async () => {
    try{
      await signOut(auth);
    }
    catch (error) {
    console.error(error);
  }
  };


  return (
    <div className="auth card text-center">
    <h1>Login</h1>
      <div className="card-body position-absolute top-50 start-50 translate-middle">
         <button onClick={signInWithGoogle}>Sign in with Google</button>
         <button onClick={logout}></button>
         
        
      </div>
    </div>
  );
};

////
<h3>Bienvenido, {user.displayName}</h3>
*/
/*import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Login = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Comprobar si el usuario está autenticado al cargar el componente
  useEffect(() => {
    const token = localStorage.getItem("firebaseToken");

    if (token) {
      // Verificar token con el backend (opcional)
      navigate("/home");
    }
  }, [navigate]);

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Obtener el token de Firebase y enviarlo al backend
      const firebaseToken = result._tokenResponse.idToken;

      const response = await axios.post(
        "https://tp-back-production.up.railway.app/api/login",
        {
          firebaseToken, // Enviar el token al backend
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        }
      );

      if (response.data.ok) {
        // Guardar el token en localStorage y actualizar el estado
        localStorage.setItem("firebaseToken", firebaseToken);
        setUser(user);
        navigate("/home");
      } else {
        console.error("Error en la autenticación del backend:", response.data);
        logout(); // Deslogear si el backend falla
      }
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null); // Actualizar el estado
      localStorage.removeItem("firebaseToken");
      navigate("/"); // Redirigir a la página de inicio
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <div className="auth card text-center">
      <h1>Login</h1>
      <div className="card-body position-absolute top-50 start-50 translate-middle">
        {user ? (
          <>
            
            <button onClick={logout}>Cerrar sesión</button>
          </>
        ) : (
          <button onClick={signInWithGoogle}>Iniciar sesión con Google</button>
        )}
      </div>
    </div>
  );
};
*/


import React, { useEffect } from "react";
//import { useAuth } from "./AuthProvider";
import { useAuth } from "../providers/AuthProvider"
import { useNavigate } from "react-router-dom";
import "./estilos.css";

export const Login = () => {
  const { signInWithGoogle, user } = useAuth();
  const navigate = useNavigate();

  // Redirigir si el usuario ya está autenticado
  /*if (user) {
    navigate("/home");
  }*/

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

