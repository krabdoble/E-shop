import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
//import  '../componentes/estilos.css';


export const UsuarioLogin = () => {

  //const [usuario, setUsuario] = useState(null);
  
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

      let r= await axios.post("http://localhost:3000/api/login",{
        firebaseToken: a._tokenResponse.idToken,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL
      })
      //setUsuario({ nombre: user.displayName, email: user.email, imagen: user.photoURL });

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

 /* const logout = async () => {
    await signOut(auth);

    localStorage.removeItem("firebaseToken");
  };*/

  return (
    <div className="auth card text-center">
      <h2 className="d-flex justify-content-center align-item-center pt-3">
                Welcome to my page 
              </h2>
      <div className="card-body position-absolute top-50 start-50 translate-middle">
      <button onClick={signInWithGoogle}>Sign in with Google</button>

        <button onClick={logout}>Log out</button>
        
      </div>
    </div>
  );
};

/*
<button onClick={signInWithGoogle}>Sign in with Google</button>

        <button onClick={logout}>Log out</button>
        {usuario ? (
                <div>
                    <h1>Bienvenido, {usuario.nombre}!</h1>
                    <button onClick={logout}>Log out</button>
                </div>
            ) : (
              <button onClick={signInWithGoogle}>Sign in with Google</button>
            )}
        */