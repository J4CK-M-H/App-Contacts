import React from 'react'
import obtenerFecha from '../utils/formatearFecha'
import { TbPencil, TbTrash } from "react-icons/tb";
import { Link } from 'react-router-dom';
import useContact from '../hooks/useContact';
import Swal from 'sweetalert2'

const Contacto = ({ contacto }) => {

  const { borrarContacto } = useContact();

  const handleDelete = () => {
    
    Swal.fire({
      title: 'Estas seguro?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        borrarContacto(contacto._id);
        Swal.fire(
          'Eliminado!',
          'El contacto ha sido eliminado!.',
          'success'
        )
      }
    })
  };

  return (
    <div className='border shadow-md rounded-md flex flex-col'>
      <img
        className='h-64 w-full object-cover object-center block rounded-t-md'
        src={`${import.meta.env.VITE_BACKEND_URL}/${contacto.foto}`}
        alt="imagen de contacto"
      />
      <div className='p-2 flex flex-col flex-1'>
        <p><b>Nombre completo:</b> {`${contacto.nombre.concat(' ', contacto.apellido)}`}</p>
        <p><b>Email:</b> {contacto.email}</p>
        <p><b>Telefono:</b> {contacto.telefono}</p>
        <p><b>Fecha Nacimiento:</b> {obtenerFecha(contacto.fecha_nacimiento)}</p>
        <div className='flex-1 flex justify-between'>
          <Link to={`edit/contacto/${contacto._id}`} state={contacto} className='self-end text-2xl text-orange-600'>
            <TbPencil />
          </Link>
          <button onClick={ handleDelete } className='self-end text-2xl text-orange-600'>
            <TbTrash />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Contacto