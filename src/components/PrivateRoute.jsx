import { useUser } from 'context/userContext';
import React from 'react';


// componente para prohibir rutas y paginas enteras 
const PrivateRoute = ({ roleList, children }) => {
  const { userData } = useUser();

  if (roleList.includes(userData.rol)) {
    return children;
  }

  return <div className='text-9xl text-red-500 '>No estás autorizado para ver este sitio.</div>;
};

export default PrivateRoute;