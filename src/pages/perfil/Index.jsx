import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USUARIO } from 'graphql/usuarios/queries';
import { useUser } from 'context/userContext';
import { Link } from 'react-router-dom';



const IndexPerfil = () => {

  const { userData } = useUser();

  const _id = userData._id
  const { data, loading, error } = useQuery(GET_USUARIO, { variables: { _id } })

  useEffect(() => {
    if (data) {

      // console.log("informacion personal:", data)
    }
  }, [data])

  if (loading) return <div> Cargando....</div>


  if (data) {

    return <div className='flex flex-col items-center justify-center w-full h-full p-10 text-xl font-bold'>

      <div className='text-2xl my-5' >Numero de identificacion: </div> <div> {data.Usuario.identificacion} </div>
      <div className='text-2xl my-5' >Nombre: </div> <div>{data.Usuario.nombre} </div>
      <div className='text-2xl my-5'>Apellido: </div> <div>{data.Usuario.apellido} </div>
      <div className='text-2xl my-5'>Correo:</div> <div> {data.Usuario.correo} </div>
      <Link to='/perfil/editar'>
        <button className='bg-blue-600 text-white font-bold text-lg py-3 px-6  rounded-xl hover:bg-blue-800 shadow-md my-2 disabled:opacity-50 disabled:bg-gray-700'>
          Editar perfil
        </button>
      </Link>

    </div>;
  } else {

    return <div> Problemas del servidor no responde </div>
  }
};

export default IndexPerfil;
