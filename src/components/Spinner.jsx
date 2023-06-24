import React from 'react'
import PacmanLoader from "react-spinners/PacmanLoader";

const Spinner = () => {
  return (
    <div className='h-[calc(100vh-80px)] flex justify-center items-center'>
      <PacmanLoader color="#36d7b7" size={40} />
    </div>
  )
}

export default Spinner