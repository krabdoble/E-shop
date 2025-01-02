/*import React, { createContext, useContext, useEffect, useState} from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../config/firebase"

const AuthContext = createContext()


export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null) 
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        onAuthStateChanged(auth,(user) => {
            setUser(user)
            setLoading(false)
        })
    },[])

    if (loading) {
        return <h1>Cargando...</h1>
    }

    return (
        <AuthContext.Provider value={{user}}>
            {children}
        </AuthContext.Provider>
    )   

}

export const useAuth = () => {
    return useContext(AuthContext)
}
*/
/*
import React, { createContext, useContext, useEffect, useState} from "react"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "../config/firebase"

const AuthContext = createContext()


export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null) 
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const unsubscribe =onAuthStateChanged(auth,(user) => {
            setUser(user)
            setLoading(false)
        })
        return unsubscribe;
    },[])

    const logout = async () => {
        try {
          await signOut(auth);
          setUser(null);
          localStorage.removeItem("firebaseToken");
        } catch (error) {
          console.error("Error al cerrar sesión:", error);
        }
      };

    if (loading) {
        return <h1>Cargando...</h1>
    }

    return (
        <AuthContext.Provider value={{user, logout}}>
            {children}
        </AuthContext.Provider>
    )   

}

export const useAuth = () => {
    return useContext(AuthContext)
}
*/

import React, { createContext, useContext, useEffect, useState} from "react"
import { auth, googleProvider } from "../config/firebase";
import { onAuthStateChanged,signInWithPopup, signOut } from "firebase/auth"
//import { auth } from "../config/firebase"
//import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext()
export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null) 
    const [loading, setLoading] = useState(true)
    //const navigate = useNavigate();

    // Comprobar si el usuario está autenticado al cargar el componente
 /* useEffect(() => {
    const token = localStorage.getItem("firebaseToken");

    if (token) {
      // Verificar token con el backend (opcional)
      navigate("/home");
    }
  }, [navigate]);*/

    const signInWithGoogle = async () => {
      try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;
  
        // Obtener el token de Firebase y enviarlo al backend
        const firebaseToken = result._tokenResponse.idToken;
  
        const response = await axios.post(
          'https://tp-back-production.up.railway.app/api/login',
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
          localStorage.setItem("userId", response.data.usuario.id); // Guarda el ID del usuario
          setUser({ ...user, id: response.data.usuario.id }); // Actualiza el contexto
          console.log("Usuario id es ", response.data.usuario.id)
          //setUser(user);
          //navigate("/home");
        } else {
          console.error("Error en la autenticación del backend:", response.data);
          logout(); // Deslogear si el backend falla
        }
      } catch (error) {
        console.error("Error al iniciar sesión con Google:", error);
      }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
          if (firebaseUser) {
            const userId = localStorage.getItem("userId");
            setUser({ ...firebaseUser, id: userId }); // Agrega el ID al estado del usuario
          } else {
            setUser(null);
          }
          setLoading(false);
        });
        return unsubscribe;
      }, []);

    const logout = async () => {
        try {
          await signOut(auth);
          setUser(null);
          localStorage.removeItem("firebaseToken");
        } catch (error) {
          console.error("Error al cerrar sesión:", error);
        }
      };

    if (loading) {
        return <h1>Cargando...</h1>
    }

    return (
        <AuthContext.Provider value={{user, signInWithGoogle, logout}}>
            {children}
        </AuthContext.Provider>
    )   

}

export const useAuth = () => {
    return useContext(AuthContext)
}