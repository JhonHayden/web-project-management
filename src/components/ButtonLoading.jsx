import React from 'react';
import ReactLoading from 'react-loading';// usa la libreria react-loading para hacer animacion de carga


// Componente de un boton con animacion de loading y de typo submit
//                                                        valor por defecto = () => { } funcion vacia  
const ButtonLoading = ({ disabled, loading, text, onClick = () => { } }) => {// debo pasarle la funcion 
  // o evento onClick para que funcione con ese evento, le paso como prop el evento onClick pero le doy un valor por 
  // defecto onClick = () => { }  para cuando use este boton y no use el evento onClick ese quede con 
  // una funcion vacia por defecto y asi ni tenga que modificar todas las llamadas y donde use este componente y no este mandando 
  // ni usando el evento onClick en los props del componente 
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type='submit'// tipo de boton es submit entonce al ser oprimido se ejecuta el evento onSubmit
      className='bg-blue-600 text-white font-bold text-lg py-3 px-6  rounded-xl hover:bg-blue-800 shadow-md my-2 disabled:opacity-50 disabled:bg-gray-700'
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
