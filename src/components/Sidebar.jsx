import { useAuth } from 'context/authContext';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import PrivateComponent from './PrivateComponent';

const SidebarLinks = () => {
  return (
    <ul className='mt-12'>
      {/*Botones de navegacion del sidebar
      to = ruta del pagina a navegar y es igual a la definida en los Routes 
      en el app.jsx*/}
      {/* <SidebarRoute to='' title='Inicio' icon='fas fa-home' /> */}
      <SidebarRoute to='' title='Inicio' />
      <SidebarRoute to='/perfil' title='Perfil' />

      <PrivateComponent roleList={['ADMINISTRADOR', 'LIDER']}>{/**me permite 
       * ocultar los componente hijos dentro del PrivateComponent si el rol de usuario no es ADMINISTRADOR
       */}
        {/* <SidebarRoute to='/usuarios' title='Usuarios' icon='fas fa-user' /> */}
        <SidebarRoute to='/usuarios' title='Usuarios' />
      </PrivateComponent>
      <SidebarRoute to='/proyectos' title='Proyectos' />
      {/* <SidebarRoute to='/inscripciones' title='Inscripciones' icon='fab fa-amazon' /> */}
      <PrivateComponent roleList={['LIDER']}>{/**me permite 
       * ocultar los componente hijos dentro del PrivateComponent si el rol de usuario no es ADMINISTRADOR
       */}
        <SidebarRoute to='/inscripciones' title='Inscripciones' />
      </PrivateComponent>

      <PrivateComponent roleList={['ESTUDIANTE']}>{/**me permite 
       * ocultar los componente hijos dentro del PrivateComponent si el rol de usuario no es ADMINISTRADOR
       */}
        <SidebarRoute to='/proyectosinscritos' title='Mis proyectos' />
      </PrivateComponent>
      <Logout />
    </ul>
  );
};

// componente  boton de cerrar sesion 
const Logout = () => {

  const { setToken } = useAuth();
  const deleteToken = () => {
    console.log('eliminar token');
    setToken(null);
    window.location.reload(true) // me permite refrescar la pagina cuando se hace cierre de sesion 
    
  };
  return (
    <li onClick={() => deleteToken()}>
      <NavLink to='/auth/login' className='sidebar-route text-red-700'>
        <div className='flex items-center'>
          <i className='fas fa-sign-out-alt' />
          <span className='text-sm  ml-2'>Cerrar Sesi??n</span>
        </div>
      </NavLink>
    </li>
  );
};

const Logo = () => {
  return (
    <div className='py-3 w-full flex flex-col items-center justify-center'>
      {/* <img src='logo.png' alt='Logo' className='h-16' /> */}
      <span className='my-2 text-xl font-bold text-center'>Web Project Management</span>
    </div>
  );
};

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  return (
    <div className='flex flex-col md:flex-row flex-no-wrap md:h-full'>
      {/* Sidebar starts */}

      <div className='sidebar hidden md:flex'>
        <div className='px-8'>
          <Logo />
          <SidebarLinks />
        </div>
      </div>
      <div className='flex md:hidden w-full justify-between bg-gray-800 p-2 text-white'>
        <i className={`fas fa-${open ? 'times' : 'bars'}`} onClick={() => setOpen(!open)} />
        <i className='fas fa-home' />
      </div>
      {open && <ResponsiveSidebar />}
      {/* Sidebar ends */}
    </div>
  );
};

const ResponsiveSidebar = () => {
  return (
    <div>
      <div
        className='sidebar h-full z-40 absolute md:h-full sm:hidden transition duration-150 ease-in-out'
        id='mobile-nav'
      >
        <div className='px-8'>
          <Logo />
          <SidebarLinks />
        </div>
      </div>
    </div>
  );
};

const SidebarRoute = ({ to, title, icon }) => {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          isActive
            ? 'sidebar-route text-white bg-blue-600'
            : 'sidebar-route text-gray-900 hover:text-white hover:bg-blue-300'
        }
      >
        <div className='flex items-center'>
          <i className={icon} />
          <span className='text-sm  ml-2'>{title}</span>
        </div>
      </NavLink>
    </li>
  );
};

export default Sidebar;
