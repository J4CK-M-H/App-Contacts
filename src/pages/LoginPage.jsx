import axios from "axios";
import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Alert from "../components/Alert";

const LoginPage = () => {

  // Context
  const { setAuth } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState({});


  const navigate = useNavigate(); 
  const location = useLocation(); 

  const token =  localStorage.getItem('token');

  if(token) {
    return <Navigate to={"/"} replace={true} state={location}/>
  }

  const handleLogin = async event => {
    event.preventDefault();

    if([email, password].some( field => field.trim() === '' )) {
      setAlert({
        message: 'Ingrese todo los campos!',
        error: true
      });

      setTimeout(() => {
        setAlert({});
      }, 2500);
      return;
    }

    console.log('wadafa')
    try {
      
      const { data } = await axios.post('http://localhost:5000/usuario/authenticate', { email, password});
      localStorage.setItem('token', (data.token));
      setAuth(data);
      navigate('/home');
      
    } catch (error) {
      setPassword('');
      setAlert({
        message: error.response.data.message,
        error: true
      });

      setTimeout(() => {
        setAlert({});
      }, 2500);
    }

  }

  const { message } = alert;


  return (
    <div className="h-screen bg-gray-200 flex flex-col justify-center items-center">

      {message && <Alert alerta={alert} />}
      <p>{ location?.state?.message }</p>
      <form className="w-[450px] bg-white shadow-md rounded-md p-5 space-y-5" onSubmit={ handleLogin }>
        <div>
          <label htmlFor="email">Email</label>
          <input 
            value={ email }
            onChange={ (e) => setEmail(e.target.value) } 
            className="block outline-none border border-gray-300 py-3 px-4 rounded-md w-full placeholder:focus:text-transparent" 
            type="text"
            name="email" 
            id="email" 
            placeholder="usuario@gmail.com"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input 
            value={ password } 
            onChange={ (e) => setPassword(e.target.value) } 
            className="block outline-none border border-gray-300 py-3 px-4 rounded-md w-full placeholder:focus:text-transparent" 
            type="password" 
            name="password" 
            id="password" 
            placeholder="*******************"
          />

        </div>

        <button className="bg-indigo-500 text-white font-semibold text-center py-3 w-full rounded-md">Login</button>
        <p className="text-center">¿Aún no tienes cuenta?, <Link className="font-bold" to={'/auth/register'}>Registrate</Link></p>
      </form>
    </div>
  )
}

export default LoginPage