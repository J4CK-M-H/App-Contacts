import { useState } from "react";
import Alert from "../components/Alert";
import { Link } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {

  const [name, setName] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [alert, setAlert] = useState({});

  const data = JSON.parse(localStorage.getItem('token'));

  if (data?.token) {
    return <Navigate to={"/"} />
  }

  const handleSubmit = async(event) => {
    event.preventDefault();

    if ([name.trim(), email.trim(), password.trim()].includes("")) {
      setAlert({
        error: true,
        message: 'Todos los campos son obligatorios'
      });

      setTimeout(() => {
        setAlert({});
      }, 2500);
      return;
    }

    let usuario = {
      nombre: name,
      apellido,
      email,
      password
    }

    try {
      
      const { data } = await axios.post('http://localhost:5000/usuario/register', usuario );
      setAlert({
        message: data.message,
        error: false
      });

      setTimeout(() => {
        setAlert({});
      }, 2500);

    } catch (error) {
      console.log(error)
      setPassword('');
      setAlert({
        message: error.response.data.message,
        error: true
      });

      setTimeout(() => {
        setAlert({});
      }, 2500);
    }

    setName('');
    setApellido('');
    setEmail('');
    setPassword('');
  };

  const { message } = alert;

  return (
    <div className="h-screen bg-gray-200 flex justify-center items-center flex-col">

      {(message) && <Alert alerta={alert} />}

      <form className="w-[450px] bg-white shadow-md rounded-md p-5 space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombre">Nombre</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="block outline-none border border-gray-300 py-3 px-4 rounded-md w-full placeholder:focus:text-transparent"
            type="text"
            name="nombre"
            id="nombre"
            placeholder="Nombre de usuario"
          />
        </div>
        <div>
          <label htmlFor="apellido">Apellido</label>
          <input
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            className="block outline-none border border-gray-300 py-3 px-4 rounded-md w-full placeholder:focus:text-transparent"
            type="text"
            name="apellido"
            id="apellido"
            placeholder="Apellido de usuario"
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block outline-none border border-gray-300 py-3 px-4 rounded-md w-full placeholder:focus:text-transparent"
            type="text" name="email" id="email"
            placeholder="usuario@gmail.com"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block outline-none border border-gray-300 py-3 px-4 rounded-md w-full placeholder:focus:text-transparent"
            type="password" name="password" id="password"
            placeholder="************"
          />
        </div>

        <button className="bg-indigo-500 text-white font-semibold text-center py-3 w-full rounded-md">Registrar</button>
        <p className="text-center">¿Ya tienes cuenta?, <Link className="font-bold" to={'/auth'}>Login</Link></p>
      </form>
    </div>
  )
}

export default RegisterPage