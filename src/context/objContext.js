
// contexto que me permitira poder pasar como props la funcion de eliminar
// objetivo paso la funcion completa no su ejecucion .. y asi poder luego llamarla dentro del formObjetivo y ejecutarla 
import { createContext, useContext } from 'react';

export const ObjContext = createContext(null);

export const useObj = () => {
  return useContext(ObjContext);
};
