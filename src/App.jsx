import React, { useState, useEffect } from 'react';
import PrivateLayout from 'layouts/PrivateLayout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserContext } from 'context/userContext';
import { AuthContext } from 'context/authContext';
import { ApolloProvider, ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';// funciones de
// apollo client para su implementacion .. para inicializar un cliente de apollo
import { setContext } from '@apollo/client/link/context';// funcionalidad de apollo client para enviar en los request 
// en sus headers el token 
import Index from 'pages/Index';
import IndexUsuarios from 'pages/usuarios';
import EditarUsuario from 'pages/usuarios/editar';
import AuthLayout from 'layouts/AuthLayout';
import Register from 'pages/auth/Register';
import Login from 'pages/auth/Login';
import jwt_decode from "jwt-decode";// me permite usar la libreria que me decodifica el token 
import IndexProyectos from 'pages/proyectos/Index';
import 'styles/globals.css';
import 'styles/tabla.css';
import NuevoProyecto from 'pages/proyectos/NuevoProyecto';
import IndexInscripciones from 'pages/inscripciones/Index';
import ProyectosInscritos from 'pages/estudiante/ProyectosInscritos';
import AvancesAProyecto from 'pages/estudiante/AvancesAProyecto';
import IndexPerfil from 'pages/perfil/Index';
import FormEditarPerfil from 'pages/perfil/FormEditarPerfil';


// import PrivateRoute from 'components/PrivateRoute';



const httpLink = createHttpLink({ // entra a la url del servidor de apollo sever .. es decir mi backend 
  // uri: 'http://localhost:4000/graphql', // url servidor backend o api local 
  uri: 'https://servidor-backend-gql.herokuapp.com/graphql', //url servidor backend o api  desplegada 
});

const authLink = setContext((_, { headers }) => {// setContext es un contexto de apollo client para permitirme
  // enviar en los headers de cada request, del frontend al backend,  el token  

  // get the authentication token from local storage if it exists
  const token = JSON.parse(localStorage.getItem('token'));// me obtiene el toque desde el local storage dado que 
  // hay lo guardamos en un principio cuando hace el login el usuario o se registra igualmente 
  // y lo pasa a formato JSON

  // return the headers to the context so httpLink can read them
  return {
    headers: {// retorno en los headers el token 
      ...headers,// me agrega todo lo que ya tiene el headers 
      authorization: token ? `Bearer ${token}` : '',// si hay token pone en el atributo authorization el valor de
      // Bearer  y el token si no hay token pone vacio  --> ' ' 
    },
  };
});


const client = new ApolloClient({// instancia o objeto de ApolloClient recibe muchisimos parametros pero por ahora los basicos son 

  cache: new InMemoryCache(),// parametro de politica de cacheo  me permite cuando recibo informacion 
  // desde el backend guardarla en  la cache del navegador para despues utilizar y optimizar la velocidad de carga de la aplicacion 
  // la politica de cache me permite configurar el comportamiento de la aplicacion de que hacer con la informacion 
  // que esta recibiendo desde el backend hay varias politicas de cacheo que determinan diferentes comportamientos de que hacer con 
  // la informacion que se recibe.. depende del tipo de aplicacion que estemos contruyendo se decide cual politica de cacheo es 
  // mas optima por ahora lo dejamos como viende recomendado y por defecto del tutorial y documentacion oficial de apollo client

  //cachees una instancia de InMemoryCache, que Apollo Client utiliza para almacenar en caché 
  // los resultados de las consultas después de obtenerlos.

  link: authLink.concat(httpLink),// concateno los headers que contienen el token con la url del servidor backend

});

function App() {
  const [userData, setUserData] = useState({});
  const [authToken, setAuthToken] = useState('');// estado que me almacena el token para toda la aplicacion y poder usarlo 
  // o cambiarlo desde cualquier parte de la aplicacion inicia con un vacio.. 
  //Este estado tiene el proposito para usarlo en las rutas privadas 
  // este estado puedo usarlo en toda la aplicacion 

  const setToken = (token) => {//me permite guardar el token en los dos lugares necesarios para su uso 
    // en contexto estado global authToken y en la localStorage al mismo tiempo cuando es llamada esta 
    // funcion a su ejecucion 
    //  me permite guardaar el token en estado authToken y si existe token lo guarda 
    // en  el localStorage como string con el metodo JSON.stringify()
    setAuthToken(token)
    if (token) {
      localStorage.setItem('token', JSON.stringify(token))// almacena el token en el local storage pero como string
      // dado que el viene como valor debo cambiarlo a string y eso lo hace el metodo JSON.stringify(token)
    } else {// si no tenemos token o es null cuando cerraron sesion.. borramos el token del local storage
      localStorage.removeItem('token')// me elimina el token del local storage 
    }
  }
  // // console.log("soy user Data : ", userData)


  useEffect(() => {

    // pendiente corregir situacion cuando se actualiza la pagina visitada se borra el estado del contexto 
    // del token AuthContext

    // const token = authToken
    // // console.log('token del usuario si soy yo : ', token)
    // // console.log("soy el usuario :",jwt_decode(token))
    if (authToken) {// evidentemente primero preguntamos si existe un token guardado en el contexto del token AuthContext
      // para poder asi si decodificar

      const userDataOnLine = jwt_decode(authToken);
      // const userDataOnLine = jwt_decode(token);
      // guardaremos la informacion decodificada del token en el estado global del conxteto de usuario(UserContext)
      // en el userData con el metodo de guardar o ser de el y es setUserData
      // setUserData( userDataOnLine)

      // // // console.log("soy user Data inicial : ", userDataOnLine)
      // // console.log("soy user Data lero lero : ", userData)

      setUserData({
        _id: userDataOnLine._id,
        nombre: userDataOnLine.nombre,
        apellido: userDataOnLine.apellido,
        identificacion: userDataOnLine.identificacion,
        correo: userDataOnLine.correo,
        rol: userDataOnLine.rol,
      });
      // console.log("soy user Data: ", userData)
    }
  }, [authToken])

  return (
    <ApolloProvider client={client}>{/*contexto para implementar apolloClient en toda la aplicacion 
    de la libreria @apollo/client metemos toda la aplicacion app.jsx en este contexto, requiere de un prop denominado 
    client  y es la instancia de apollo cliente un objeto de tipo ApolloClient.. entonces apollo provider recibe 
    como prop un objeto de tipo ApolloClient
    
    ApolloProvider nos permite hacer Query y Mutaciones en cualquier parte de nuestra aplicacion */}
      <AuthContext.Provider value={{ authToken, setAuthToken, setToken }}>{/**contexto para guardar el token y tenerlo disponible en toda la aplicion 
       * le paso como prop como input la funcion que me guarda el token tanto en el estado como en la local Storage
       * de esta manera puedo usar esta funcion desde todas partes de mi aplicacion.. muy necesario para hacer 
       * la implementacion de las rutas privadas 
      */}
        <UserContext.Provider value={{ userData, setUserData }}>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<PrivateLayout />}>{/*me muestra el componente de diseño layout de las paginas 
             contenidas en este privateLayout */}
                <Route path='' element={<Index />} />
                <Route path='/perfil' element={<IndexPerfil />} />{/*Ruta pagina tabla usuarios*/}
                <Route path='/perfil/editar' element={<FormEditarPerfil />} />{/*Ruta pagina tabla usuarios*/}
                <Route path='/usuarios' element={<IndexUsuarios />} />{/*Ruta pagina tabla usuarios*/}
                <Route path='/usuarios/editar/:_id' element={<EditarUsuario />} />{/*Ruta pagina ediccion de un 
              usuario por el id este tipo de url con los dos puntos al final y luego el _id es para
              mandar datos a traves de la url almacenados en la varible _id . es decir lo que se escriba despues 
              de los dos puntos se almacenara en la variable _id y asi usarlo */}
                <Route path='/proyectos' element={<IndexProyectos />} /> {/**ruta para la pagina (interfaz) de proyectos  */}

                <Route path='/proyectos/nuevoProyecto' element={<NuevoProyecto />} />{/** Ruta interfaz de crear nuevo proyecto*/}

                <Route path='/inscripciones' element={<IndexInscripciones />} />{/** Ruta interfaz de lista inscripciones*/}

                <Route path='/proyectosinscritos' element={<ProyectosInscritos />} />
                <Route path='/proyectosinscritos/avances/:idProyecto' element={<AvancesAProyecto />} />
              </Route>
              <Route path='/auth' element={<AuthLayout />}>{/**Ruta de pagina de registro dentro de este authLayaout 
             * van las paginas que tendra este AuthLayout
             */}
                <Route path='register' element={<Register />} />
                <Route path='login' element={<Login />} />

              </Route>
            </Routes>
          </BrowserRouter>
        </UserContext.Provider>
      </AuthContext.Provider>
    </ApolloProvider>
  );
}

export default App;
