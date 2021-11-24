import Sidebar from 'components/Sidebar';
import { Outlet } from 'react-router';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PrivateLayout = () => {
  return (
    <div className='flex flex-col md:flex-row flex-no-wrap h-screen'>
      <Sidebar />
      <div className='flex w-full h-full'>
        <div className='w-full h-full  overflow-y-scroll'>
      <h1>soy layout privado .. maqueta privada </h1>
          <Outlet />
        </div>
      </div>
      <ToastContainer />{/*me permite mostrar mensajes de error o de exito, lo pongo en el privatelayout
      para que se muestre en toda la aplicacion independientemente en que pagina este dentro de este 
      privatelayout  es decir este es el componente del mensaje flotante */}
    </div>
  );
};

export default PrivateLayout;
