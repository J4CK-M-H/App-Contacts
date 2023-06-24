const obtenerFecha = (fecha) => {

  const date = new Date(fecha.split('T')[0].split('-'));
  
  const opciones = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
  return date.toLocaleDateString('es-ES', opciones);
};

export default obtenerFecha;