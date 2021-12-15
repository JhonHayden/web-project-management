
// contexto que me permitira poder pasar como props la funcion de eliminar
// objetivo paso la funcion completa no su ejecucion .. y asi poder luego llamarla dentro del formObjetivo y ejecutarla 
import { createContext, useContext } from 'react';

export const ObservacionContext = createContext(null);

export const useObservacionContext = () => {
  return useContext(ObservacionContext);
};
