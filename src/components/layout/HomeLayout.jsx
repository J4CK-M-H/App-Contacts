import { Link, Outlet } from "react-router-dom"

const HomeLayout = () => {

  console.log('Home layout')

  const handleLogout = () => {
    console.log('click')
  };

  return (
    <div>
      <nav className="bg-blue-600 w-full h-20 flex items-center space text-white justify-between px-5">
        <h2>Navigate</h2>
        <div className="flex gap-x-4 p-2">
        <Link className="font-semibold" to={"/"}>Home</Link>
        <Link className="font-semibold" to={"/profile"}>Perfil</Link>
        <button className="font-semibold" onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      <Outlet />
    </div>
  )

}

export default HomeLayout