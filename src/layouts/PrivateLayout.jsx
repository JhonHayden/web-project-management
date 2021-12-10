import Sidebar from 'components/Sidebar';
import { Outlet } from 'react-router';
import React, { useEffect, useState } from 'react';
import { ACTUALIZAR_TOKEN } from 'graphql/auth/mutations';// importo el template de la mutacion validar o refrescar token 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from 'context/authContext';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router';// hook paara redireccionar al home o a cualquier pagina deacuerdo a la ruta
// que le demos 

const PrivateLayout = () => {

  // const [loadingAuth, setLoadingAuth] = useState(false)// estado que usare para validar  que si tengo el token ya guardado en el 
  // contexto 

  const navigate = useNavigate();// uso del hook para redireccionar a otra pagina en este caso 
  // lo usaremos para direcionar allogin cuando no exista token de autorizacion  

  const { authToken, setAuthToken, setToken } = useAuth();// me permite poder usar los estados globales del contexto donde 


  const [actualizarToken, { data: dataMutation, loading: loadingMutation, error: errorMutation }] =
    useMutation(ACTUALIZAR_TOKEN);// mutacion de validar o refrescar el token  me permite ejecutar la 
  // mutacion de validacion de un token 

  useEffect(() => {// cuando se carga o renderiza esta pagina por primera vez me ejecuta la mutacion actualizarToken
    actualizarToken(); // esta funcion o mutacion lo que hace es pedir un nuevo token pero como es un request  ya con la configuracion 
    // el en app.jsx de esta funcion (const authLink = setContext((_, { headers }) => {) permite que cualquier peticion o request 
    //   sea query o mutacion lleve en ese request el token en su headers y esta mutacion en el backend me permite generar un nuevo 
    //   token si el token recibido es bueno 

  }, [])

  useEffect(() => {
    console.log("SOY EL REPONSE(return) DE LA MUTACION actualizarToken =", dataMutation)//dataMutation es el response de la mutacion actualizarToken del backend, es el return 
    // del resolver de la mutacion actualizarToken en el backend 
    if (dataMutation) {// si existe dataMutation, el cual es un objeto con contenido en varias capas, si puedo preguntar
      //  luego por su contenido mas interno  si no, no 
      const tokenActualizado = dataMutation.actualizarToken.token;
      if (tokenActualizado) {
        setToken(tokenActualizado);// guardo el token nuevo en el contexto global y tambien en el local storage
        console.log("Soy el token actualizado = ", tokenActualizado)
      } else {// si no existe token guardeme en el estado global en el contexto (nst { authToken, setAuthToken, setToken } = useAuth();).. null 
        setToken(null)
        navigate('/auth/login');// si no existe token me dirige al home 
      }
    }
  }, [dataMutation])



  useEffect(() => {

    console.log('TOKEN ACTUAL: ', authToken)
    console.log('loadingMutation: ', loadingMutation)

  }, [authToken])

  if (loadingMutation) {
    return (
      <div>
        <h1 className='text-9xl'>
          Cargando...........
        </h1>
      </div>
    )
  }


  // if (!authToken) {// si no tengo token 

  //   navigate('/auth/login');
  //   // return (
  //   //   <div>
  //   //     <h1 className='text-8xl'>
  //   //       {/* Usted no esta autorizado */}
  //   //     </h1>
  //   //   </div>)
  // }

  return (
    <div className='flex flex-col md:flex-row flex-no-wrap h-screen'>
      <Sidebar />
      <div className='flex w-full h-full'>
        <div className='w-full h-full  overflow-y-scroll'>
          <h1>soy layout privado .. maqueta privada </h1>
          <Outlet />
        </div>
      </div>
      <div>

        <ToastContainer />{/*me permite mostrar mensajes de error o de exito, lo pongo en el privatelayout
      para que se muestre en toda la aplicacion independientemente en que pagina este dentro de este 
      privatelayout  es decir este es el componente del mensaje flotante */}
      </div>
    </div>
  );
};

export default PrivateLayout;
