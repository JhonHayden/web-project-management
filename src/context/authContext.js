// contexto para manejar el token en diferentes partes de mi aplicacion 

import { createContext, useContext } from 'react';

export const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

