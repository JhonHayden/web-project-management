import React, { useState } from 'react';
import PrivateLayout from 'layouts/PrivateLayout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserContext } from 'context/userContext';
import { AuthContext } from 'context/authContext';
import { ApolloProvider, ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';// funciones de
// apollo client para su implementacion .. para inicializar un cliente de apollo
import Index from 'pages/Index';
import Page2 from 'pages/Page2';
import IndexCategory1 from 'pages/category1/Index';
import Category1 from 'pages/category1/CategoryPage1';
import IndexUsuarios from 'pages/usuarios';
import EditarUsuario from 'pages/usuarios/editar';
import 'styles/globals.css';
import 'styles/tabla.css';
import AuthLayout from 'layouts/AuthLayout';
import Register from 'pages/auth/Register';
import Login from 'pages/auth/Login';

// import PrivateRoute from 'components/PrivateRoute';

// const httpLink = createHttpLink({ // dentra la url del servidor de apollo sever .. es decir mi backend 
//   uri: 'https://servidor-gql-mintic.herokuapp.com/graphql',
// });

const client = new ApolloClient({// instancia o objeto de ApolloClient recibe muchisimos parametros pero por ahora los basicos son 
  uri: 'http://localhost:4000/graphql', // parmetro de la URL al cual se conectara el cliente de apollo es decir 
  // aqui va la url del backend 
  cache: new InMemoryCache(),// parametro de politica de cacheo  me permite cuando recibo informacion 
  // desde el backend guardarla en  la cache del navegador para despues utilizar y optimizar la velocidad de carga de la aplicacion 
  // la politica de cache me permite configurar el comportamiento de la aplicacion de que hacer con la informacion 
  // que esta recibiendo desde el backend hay varias politicas de cacheo que determinan diferentes comportamientos de que hacer con 
  // la informacion que se recibe.. depende del tipo de aplicacion que estemos contruyendo se decide cual politica de cacheo es 
  // mas optima por ahora lo dejamos como viende recomendado y por defecto del tutorial y documentacion oficial de apollo client

  //cachees una instancia de InMemoryCache, que Apollo Client utiliza para almacenar en caché 
  // los resultados de las consultas después de obtenerlos.
});

function App() {
  const [userData, setUserData] = useState({});
  const [authToken, setAuthToken] = useState('');// estado que me almacena el token para toda la aplicacion y poder usarlo 
  // o cambiarlo desde cualquier parte de la aplicacion inicia con un vacio.. 
  //Este estado tiene el proposito para usarlo en las rutas privadas 
  // este estado puedo usarlo en toda la aplicacion 

  const setToken = (token) => {// me permite guardaar el token en estado authToken y si existe token lo guarda 
    // en  el localStorage como string con el metodo JSON.stringify()
    setAuthToken(token)
    if (token) {
      localStorage.setItem('token', JSON.stringify(token))// almacena el token en el local storage pero como string
      // dado que el viene como valor debo cambiarlo a string y eso lo hace el metodo JSON.stringify(token)
    }
  }

  return (
    <ApolloProvider client={client}>{/*contexto para implementar apolloClient en toda la aplicacion 
    de la libreria @apollo/client metemos toda la aplicacion app.jsx en este contexto, requiere de un prop denominado 
    client  y es la instancia de apollo cliente un objeto de tipo ApolloClient.. entonces apollo provider recibe 
    como prop un objeto de tipo ApolloClient
    
    ApolloProvider nos permite hacer Query y Mutaciones en cualquier parte de nuestra aplicacion */}
      <AuthContext.Provider value={{ setToken }}>{/**contexto para guardar el token y tenerlo disponible en toda la aplicion 
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
                <Route path='/usuarios' element={<IndexUsuarios />} />{/*Ruta pagina tabla usuarios*/}
                <Route path='/usuarios/editar/:_id' element={<EditarUsuario />} />{/*Ruta pagina ediccion de un 
              usuario por el id este tipo de url con los dos puntos al final y luego el _id es para
              mandar datos a traves de la url almacenados en la varible _id . es decir lo que se escriba despues 
              de los dos puntos se almacenara en la variable _id y asi usarlo */}
                <Route path='page2' element={<Page2 />} />
                <Route path='category1' element={<IndexCategory1 />} />
                <Route path='category1/page1' element={<Category1 />} />
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
