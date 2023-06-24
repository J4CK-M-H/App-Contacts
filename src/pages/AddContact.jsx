import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useContact from '../hooks/useContact';
import useAuth from '../hooks/useAuth';
import Alert from '../components/Alert';
import Swal from 'sweetalert2';

const AddContact = () => {

  // Providers
  const { agregarContacto } = useContact();
  const { auth } = useAuth()

  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [alert, setAlert] = useState({});

  const file = useRef();

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    let foto = file.current.files[0];

    if ([nombre, apellido, email, telefono, fechaNacimiento].some(field => field.trim() === '') || foto == undefined) {
      setAlert({
        message: 'Ingrese todo los campos',
        error: true
      });

      setTimeout(() => {
        setAlert({});
      }, 2500);

      return;
    }

    let contacto = {
      nombre,
      apellido,
      telefono,
      email,
      fecha_nacimiento: fechaNacimiento,
      foto,
      usuarioId: auth._id
    }

    setNombre('')
    setApellido('')
    setEmail('')
    setTelefono('')
    setFechaNacimiento('')
    file.current.value = null;

    await agregarContacto(contacto);

    navigate('/home');
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Nuevo contacto agregado!',
      showConfirmButton: false,
      timer: 1500
    });
  };

  let { message } = alert;

  return (
    <div className='p-5 bg-slate-50 h-screen'>
      <Link to={`/home`}
        className="bg-orange-400 text-white font-semibold text-xl rounded-md py-2 mt-4 block w-52 text-center"
      >Volver</Link>

      <div className='w-4/5 bg-white shadow-xl mx-auto mt-5 p-5 md:w-[700px]'>

        <div className='w-full'>
          {(message) && <Alert alerta={alert} />}
        </div>

        <form className='space-y-8' onSubmit={handleSubmit}>
          <div>
            <label htmlFor="nombre" className='font-semibold'>Nombre</label>
            <input value={nombre} onChange={(e) => setNombre(e.target.value)} className='block py-3 px-4 bg-gray-50 w-full rounded-md mt-2 border border-slate-300 outline-none' type="text" name="nombre" id="nombre" />
          </div>
          <div>
            <label htmlFor="apellido" className='font-semibold'>Apellido</label>
            <input value={apellido} onChange={(e) => setApellido(e.target.value)} className='block py-3 px-4 bg-gray-50 w-full rounded-md mt-2  border border-slate-300 outline-none' type="text" name="apellido" id="apellido" />
          </div>
          <div>
            <label htmlFor="email" className='font-semibold'>Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} className='block py-3 px-4 bg-gray-50 w-full rounded-md mt-2  border border-slate-300 outline-none' type="text" name="email" id="email" />
          </div>
          <div>
            <label htmlFor="telefono" className='font-semibold'>Telefono</label>
            <input value={telefono} onChange={(e) => setTelefono(e.target.value)} className='block py-3 px-4 bg-gray-50 w-full rounded-md mt-2  border border-slate-300 outline-none' type="text" name="telefono" id="telefono" />
          </div>
          <div>
            <label htmlFor="foto" className='font-semibold'>Foto</label>
            <input ref={file} className='block' type="file" name="foto" id="foto" />
          </div>
          <div>
            <label htmlFor="birth" className='font-semibold'>Fecha de nacimiento</label>
            <input value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} className='block border text-slate-600 outline-none w-full py-2 px-4 rounded-md font-bold' type="date" name="fecha_nacimiento" id="birth" />
          </div>

          <button className='w-full py-3 text-center text-white bg-orange-400 rounded-md font-semibold uppercase'>Agregar</button>
        </form>
      </div>
    </div>
  )
}

export default AddContact