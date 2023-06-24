import axios from "axios";
import { createContext, useEffect, useState } from "react"
import useAuth from "../hooks/useAuth";

const ContactContext = createContext();

const ContactProvider = ({ children }) => {

  const { auth } = useAuth();
  const [loading, setLoading] = useState(true);
  const [contactos, setContactos] = useState([]);


  useEffect(() => {

    const obtenerContactos = async () => {

      setLoading(true);
      let token = (localStorage.getItem('token'));

      if (!token) {
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }

      try {
        const { data } = await axios(`${import.meta.env.VITE_BACKEND_URL}/contacto/mis-contactos`, config);
        setContactos(data);
        setLoading(false);
      } catch (error) {
        console.log(error)
      }
    };

    obtenerContactos();
    
  }, [auth])




  const agregarContacto = async (contacto) => {

    let token = (localStorage.getItem('token'));

    if (!token) {
      return;
    }

    let config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }

    console.log(contacto)
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/contacto/agregar_contacto`, contacto, config);
      setContactos(previousData => [...previousData, data])
    } catch (error) {
      console.log(error)
    }

  };

  const editarContacto = async (id, contacto) => {

    let token = (localStorage.getItem('token'));

    if (!token) {
      return;
    }

    let config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }

    try {
      const { data } = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/contacto/editar_contacto/${id}`, contacto, config);
      const contactosAcutalizados = contactos.map(contacto => (contacto._id === data._id) ? data : contacto);
      setContactos(contactosAcutalizados);
    } catch (error) {
      console.log(error)
    }

  };

  const borrarContacto = async (contactoId) => {

    try {
      const { data } = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/contacto/borrar_contacto/${contactoId}`);
      const contactosAcutalizados = contactos.filter(contacto => (contacto._id !== data._id));
      setContactos(contactosAcutalizados);
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <ContactContext.Provider
      value={{
        contactos,
        setContactos,
        loading,
        agregarContacto,
        editarContacto,
        borrarContacto
      }}
    >
      {children}
    </ContactContext.Provider>
  )

}

export {
  ContactProvider
}

export default ContactContext