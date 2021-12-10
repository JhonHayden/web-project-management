import React, { useEffect } from 'react'
import { useQuery } from '@apollo/client';
import { GET_AVANCES } from 'graphql/avances/queries';
import { useParams, Link } from 'react-router-dom';


const AvancesAProyecto = () => {




    const { idProyecto } = useParams();// funcionde react-router-dom que permite capturar el numero escrito al 
    // final de la ruta de EditarUsuario
    // <Route path='/usuarios/editar/:_id' element={<EditarUsuario />} me captura el  valor escrito despues de los dos 
    // puntos este valor esta almacenado en la varible _id es decir si se escribe la url 
    // http://localhost:3000/usuarios/editar/(aqui un _id de un usuario real guardado en la base de datos)  useParams lo 
    // captura y lo almacena en la variable {_id}

    const {
        data: dataQueryAvances,
        loading: loadingQueryAvances,
        error: errorQueryAvances } = useQuery(GET_AVANCES, { variables: { idProyecto } })


    useEffect(() => {
        console.log("dataQueryAvances: ",dataQueryAvances)
    }, [dataQueryAvances])


    return (
        <div>
            soy avances de mis proyecto escogido por id
        </div>
    )
}

export default AvancesAProyecto
