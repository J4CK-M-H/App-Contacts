import axios from "axios";
import { createContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import useContact from "../hooks/useContact";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

  const [auth, setAuth] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const isAutenticated = async () => {

      const token = localStorage.getItem('token');

      if (!token) {
        setLoading(false);
        return;
      }

      const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }

      try {
        const { data } = await axios(`${import.meta.env.VITE_BACKEND_URL}/usuario/session_active`, config);
        setAuth(data);

      } catch (error) {
        console.log(error);
        // setAuth({});
      }

      setLoading(false);

    };

    isAutenticated();

  }, []);


  const closeSession = () => {
    setAuth({});
  }


  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        loading,
        closeSession
      }}
    >
      {children}
    </AuthContext.Provider>
  )

}

export {
  AuthProvider
}

export default AuthContext