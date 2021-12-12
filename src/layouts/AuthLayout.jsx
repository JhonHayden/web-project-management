import React from 'react'
import { Outlet } from 'react-router';
import { ToastContainer } from 'react-toastify';


const AuthLayout = () => {
  return (
    <div className='flex flex-col md:flex-row flex-no-wrap h-screen'>
      <div className='flex w-full h-full'>
        <div className='w-full h-full  overflow-y-scroll'>
          <Outlet />
          <ToastContainer />{/*me permite mostrar mensajes de error o de exito, lo pongo en el privatelayout
      para que se muestre en toda la aplicacion independientemente en que pagina este dentro de este 
      privatelayout  es decir este es el componente del mensaje flotante */}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout
