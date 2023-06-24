import React, { useRef, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import useContact from '../hooks/useContact';
import Swal from 'sweetalert2';

const EditContact = () => {

  const { state } = useLocation();
  const { id } = useParams();
  const { editarContacto } = useContact();
  const navigate = useNavigate();

  const date = new Date(state.fecha_nacimiento);
  const fecha = date.toLocaleString([], {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  const format = `${fecha.split('/')[2]}-${fecha.split('/')[1]}-${fecha.split('/')[0]}`;

  const [nombre, setNombre] = useState(state.nombre);
  const [apellido, setApellido] = useState(state.apellido);
  const [email, setEmail] = useState(state.email);
  const [telefono, setTelefono] = useState(state.telefono);
  const [fechaNacimiento, setFechaNacimiento] = useState(format);

  const [foto, setFoto] = useState('')

  const file = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    let imagen = file.current.files[0];

    if ([nombre, apellido, email, telefono, fechaNacimiento].some(field => field.trim() === '')) {
      return console.warn('Not Submit');
    }

    let contacto = {};

    if (imagen) {
      contacto = {
        nombre,
        apellido,
        telefono,
        email,
        fecha_nacimiento: fechaNacimiento,
        foto: imagen,
      }
    } else {
      contacto = {
        nombre,
        apellido,
        telefono,
        email,
        fecha_nacimiento: fechaNacimiento,
      }
    }

    setNombre('')
    setApellido('')
    setEmail('')
    setTelefono('')
    setFechaNacimiento('')
    file.current.value = null;

    await editarContacto(id, contacto);
    navigate('/home');
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Cambios guardados correctamente',
      showConfirmButton: false,
      timer: 1500
    });
  };

  return (
    <div className='p-5 bg-slate-50 h-screen'>
      <Link to={`/home`}
        className="bg-orange-400 text-white font-semibold text-xl rounded-md py-2 mt-4 block w-52 text-center"
      >Volver</Link>

      <div className='w-4/5 bg-white shadow-xl mx-auto mt-5 p-5 md:w-[700px]'>
        <form className='space-y-8' onSubmit={handleSubmit}>
          <div>
            <label htmlFor="nombre" className='font-semibold'>Nombre</label>
            <input value={nombre} onChange={(e) => setNombre(e.target.value)} className='block py-3 px-4 bg-slate-100 w-full rounded-md mt-2 border border-slate-300 outline-none' type="text" name="nombre" id="nombre" />
          </div>
          <div>
            <label htmlFor="apellido" className='font-semibold'>Apellido</label>
            <input value={apellido} onChange={(e) => setApellido(e.target.value)} className='block py-3 px-4 bg-slate-100 w-full rounded-md mt-2  border border-slate-300 outline-none' type="text" name="apellido" id="apellido" />
          </div>
          <div>
            <label htmlFor="email" className='font-semibold'>Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} className='block py-3 px-4 bg-slate-100 w-full rounded-md mt-2  border border-slate-300 outline-none' type="text" name="email" id="email" />
          </div>
          <div>
            <label htmlFor="telefono" className='font-semibold'>Telefono</label>
            <input value={telefono} onChange={(e) => setTelefono(e.target.value)} className='block py-3 px-4 bg-slate-100 w-full rounded-md mt-2  border border-slate-300 outline-none' type="text" name="telefono" id="telefono" />
          </div>
          <div>
            <label htmlFor="foto" className='font-semibold'>Foto</label>
            <div className=''>
              <input
                ref={file}
                onChange={(event) => setFoto(event.target.files[0])}
                className='text-transparent w-32 file:w-full file:cursor-pointer file:bg-red-500 file:border-none file:text-white file:py-2 file:rounded-md'
                type="file"
                name="foto"
                id="foto"
              />
              {/* <p>{(file.current?.files[0]) ?  file.current?.files[0].name : state.foto }</p> */}
              {
                (file.current?.files[0])
                  ? <p>{file.current?.files[0].name}</p>
                  : <img className='w-52 block mt-5' src={`${import.meta.env.VITE_BACKEND_URL}/${state.foto}`} alt="" />
              }
            </div>
          </div>
          <div>
            <label htmlFor="birth" className='font-semibold'>Fecha de nacimiento</label>
            <input value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} className='block border text-slate-600 outline-none w-full py-2 px-4 rounded-md font-bold' type="date" name="fecha_nacimiento" id="birth" />
          </div>

          <button className='w-full py-3 text-center text-white bg-orange-400 rounded-md font-semibold uppercase'>Guardar Cambios</button>
        </form>
      </div>
    </div>
  )
}

export default EditContact