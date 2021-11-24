import React from 'react';
import ReactLoading from 'react-loading';// usa la libreria react-loading para hacer animacion de carga


// Componente de un boton con animacion de loading y de typo submit 
const ButtonLoading = ({ disabled, loading, text }) => {
  return (
    <button
      disabled={disabled}
      type='submit'
      className='bg-indigo-700 text-white font-bold text-lg py-3 px-6  rounded-xl hover:bg-indigo-500 shadow-md my-2 disabled:opacity-50 disabled:bg-gray-700'
    >
      {loading ? <ReactLoading type='spin' height={30} width={30} /> : text}{/*si el prop o la variable 
      de entrada loading es verdadera muestra la animacion de loading spin si no muestra el texto del boton 
      esto con el proposito de animar la carga y espera de confirmar la ediccion de un usuario
      
      el loading es el loading de hook de la mutacion de edicion (loading: mutationLoading)
      useMutation(EDITAR_USUARIO) este parametro se lo paso como prop al boton asi el esta en cargando mientras 
      la operacion de hoolo useMutation esta ejecutando el cual es la edicion de un usuario  este hook entrega este 
      parametro de loading con el valor de true si aun no se termina de hacer la operacion  en el backend y false 
      si ya se hizo la operacion .. el nombre loading es reservado asi debe llamarse en el hookk pero se le 
      puede cambiar si se le asigna asi  (loading: mutationLoading).
      nos permite hacer la animacion de que la mutacion esta cargando y en proceso  */}
    </button>
  );
};

export default ButtonLoading;
