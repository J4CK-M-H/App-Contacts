import PacmanLoader from "react-spinners/PacmanLoader";
import Spinner from "../components/Spinner";
import useAuth from "../hooks/useAuth";
import useContact from "../hooks/useContact";
import { Link } from "react-router-dom";
import Contacto from "../components/Contacto";

const HomePage = () => {

  const { auth, closeSession } = useAuth();
  const { contactos, loading, setContactos } = useContact();

  const handleCloseSession = () => {
    closeSession();
    setContactos([]);
    localStorage.removeItem('token');
  };

  return (
    <div className="p-5">
      <div className="flex justify-between mb-2">
        <h2 className="text-3xl font-semibold">Mi Agenda!</h2>
        <button
          onClick={handleCloseSession}
          className="bg-red-600 w-32 rounded-md text-white font-semibold flex items-center justify-center"
        >Salir</button>
      </div>
      <hr />
      <Link to={`/add`}
        className="bg-orange-400 text-white font-semibold text-xl rounded-md py-2 mt-4 block w-52 text-center"
      >Agregar Contacto</Link>
      {
        (!loading && contactos.length == 0)
          ?
          <div className="flex flex-col h-96 mt-8 items-center justify-center gap-y-4">
            <h2 className="font-semibold text-2xl">Lista de contactos vacia!</h2>
            <div className="w-60 h-60 bg-slate-200 flex justify-center items-center rounded-full border-4 border-slate-100 shadow-slate-300 shadow-lg">
              <img className="w-3/5 h-3/5 block" src={`./imgs/contacto-3d.png`} alt="imagen" />
            </div>
          </div>
          : (
            <div className="grid fill-colums gap-5 py-4 text-sm ">
              {
                contactos.map(contacto => (
                  <Contacto key={contacto._id} contacto={contacto} />
                ))
              }
            </div>
          )
      }
    </div >
  )
}

export default HomePage