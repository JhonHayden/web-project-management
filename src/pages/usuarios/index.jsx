import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';// Hook que permite hacer las consultas o querys al backend
import { GET_USUARIOS } from 'graphql/usuarios/queries';// template o plantilla de consulta de Usuarios string de graphql
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';// me permite hacer enlaces y navegar  a otras paginas 
import { Enum_Rol, Enum_EstadoUsuario } from 'utils/enums';
import PrivateRoute from 'components/PrivateRoute';

const IndexUsuarios = () => {
  const { data, error, loading, refetch } = useQuery(GET_USUARIOS);// al hook le paso como parametro que es la
  // cadena de consulta o string de consulta de graphql escritas dentro de la funcio gql. es decir se le pasa toda la consulta esta esta guardada
  // en la variable GET_USUARIOS este hook me retorna la data el cual es toda la respuesta que le solicitamos al backend es decir los datos 
  // esta data es una palabra reservada lo mismo que el error si el backend retorna un error y el loanding es la varible que nos permite mostrar un 
  // mesaje de cargado es decir esta variable es verdadera mientras que el backend no retorna la data apenas la retoner es false 
  // SON NOMBRES RESERVADOS LOS RETORNOS data,erro, loading no se les puede colocar otro nombre ni en mayuculas ni nada 

  // la cadena de la consulta o string de consulta de graphQL tambien se le denomina template de gql esta se le pasa al hook useQuery

  // cada ves que se actualize la pagina index.js el cual es la tabla con todos los usuarios o se visite a la ruta /usuarios se ejecuta
  //  el hook de useQuery el cual trae todos lo datos y luego los pinto en la tabla  

  // esto sucede la primera ves, trae los dtaos desde el backend y lo deja en la cache y luego las demas veces solo consulta la informacion desde 
  // la cache y hace que la navegacion sea rapida la carga de los datos .. y lo hace el hook useQuery de graphql client por 
  // la configuracion de  cache: new InMemoryCache(), en el   new ApolloClient 
  // si se estuviera trabajando con axios no sucede esto si no que hace la consulta nuevamente al backend cada vez que se renderiza la 
  // pagina nuevamente 

  useEffect(() => {
    refetch()
  }, [])

  useEffect(() => {
    console.log('data servidor', data);// estamos escuchando la variable data para mostrarla en consola si data sufre un 
    // cambio o se modifica se imprime en consola 
  }, [data]);

  useEffect(() => {
    if (error) {
      toast.error('Error consultando los usuarios');// muestra la ventana de error flotante si ocurre un error en la 
      // consulta hecha por el useQuery al backend .. es decir activa que se renderize y se muestre el componente 
      //<ToastContainer /> el cual es la ventana flotante
    }
  }, [error]);

  if (loading) return <div>Cargando....</div>;

  return (
    //Pagina principal de consulta coleccion usuarios (IndexUsuarios)
    <PrivateRoute roleList={['ADMINISTRADOR', 'LIDER']}>
      <div>
        <div className='font-bold text-2xl  flex items-center justify-center m-5 xl '>

          <h1 >
            Lista Usuarios
          </h1>
        </div>
        <table className='tabla'>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellidos</th>
              <th>Correo</th>
              <th>Identificación</th>
              <th>Rol</th>
              <th>Estado</th>
              <th>Editar Estado </th>
            </tr>
          </thead>
          <tbody>
            {data &&  //me verifica y valida si la variable data exite si tiene contenido si es asi me hace 
              // el data.Usuarios.map() data es un objeto que tiene la propiedad Usuarios y esta propiedad
              //  usuarios tiene el array con todos los usuarios traidos desde el backend
              data.Usuarios ?// operacion ternaria si esta la informacion del usuario como respuesta del backend en e
              // query de usuario mostraremos la tabla con los usuario 
              data.Usuarios.map((u) => {
                return (
                  <tr key={u._id}>
                    <td>{u.nombre}</td>
                    <td>{u.apellido}</td>
                    <td>{u.correo}</td>
                    <td>{u.identificacion}</td>
                    <td>{Enum_Rol[u.rol]}</td>
                    <td>{Enum_EstadoUsuario[u.estado]}</td>{/**me recorre el objeto enumerador(Enum_EstadoUsuario
                   * donde u.estado es la clave y me trae el valor esto con el proposito de 
                   * mostrar el texto en misnusculas de este enumerador la  clave es en mayusculas su valor es
                   * en misnusculas 
                   */}
                    <td>
                      <Link to={`/usuarios/editar/${u._id}`}>{/*cuando le dan click al icono o link me direcciona a la ruta
                     http://localhost:3000/usuarios/editar/${u._id}  donde u._id carga el _id de mongoDB es decir el ObjectId almacenado 
                     en la bd u reprensenta el usuario de la fila en cuestion donde le den click al ling o icono de editar esto 
                     gracias al metodo .map que recorre una lista de usuarios y los renderiza uno a uno como una fila de una tabla 
                     en html y accedo a los atributos de cada usurio para mostrar en las celdas con u.atributo */}
                        <i className='fas fa-pen text-yellow-600 hover:text-yellow-400 cursor-pointer' />
                      </Link>
                    </td>
                  </tr>
                );
              }) : (
                // si no esta la informacion de lo usuarios en la data que retorna el backend como respuesta 
                // al query de usuarios.. y esto porque esta retornando un null dado que el usuario no tiene el rol 
                // permitido para acceder a esta informacion entonces muestre no esta autorizado
                <div>
                  No autorizado
                </div>
              )
            }
          </tbody>
        </table>
      </div>
    </PrivateRoute>
  );
};

export default IndexUsuarios;
