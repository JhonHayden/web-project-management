import React, { useEffect, useState } from 'react'
import 'styles/globals.css';
import { PROYECTOS } from 'graphql/proyectos/queries';
import { Dialog } from '@mui/material';
import { Enum_EstadoProyecto } from 'utils/enums';
import DropDown from 'components/Dropdown';
import ButtonLoading from 'components/ButtonLoading';
import { EDITAR_PROYECTO } from 'graphql/proyectos/mutations';
import useFormData from 'hooks/useFormData';
import { useMutation, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';// me permite navegar a otras paginas 
import PrivateComponent from 'components/PrivateComponent';
import { CREAR_INSCRIPCION } from 'graphql/inscripciones/mutaciones';
import { useUser } from 'context/userContext';
import { toast } from 'react-toastify';
import { nanoid } from 'nanoid';
import {
    AccordionStyled,
    AccordionSummaryStyled,
    AccordionDetailsStyled,
} from 'components/Accordion';


const IndexProyectos = () => {

    const { data: queryData, loading, error } = useQuery(PROYECTOS);// ejecuta el query de proyectos 


    useEffect(() => {
        console.log('datos proyecto', queryData);
    }, [queryData]);

    if (loading) return <div>Cargando...</div>;//

    if (queryData.Proyectos) {

        return (
            <div className='p-4 flex flex-col'>
                <div className='self-center'>
                    <h1 className='text-2xl font-bold text-gray-900'>Lista de proyectos </h1>
                </div>
                <PrivateComponent roleList={['LIDER']}>

                    <div className='self-end'>
                        <button className='self-end bg-gray-500 text-gray-50 rounded-3xl p-2 shadow-2xl hover:bg-gray-600 mt-1 '>
                            <Link to='/proyectos/nuevoProyecto'>
                                crear nuevo proyecto
                            </Link>
                        </button>
                    </div>
                </PrivateComponent>

                {queryData.Proyectos.map((proyecto) => { // recorro la data para mostrarla

                    return (

                        <AccordionProyecto key={nanoid()} proyecto={proyecto} />
                    )
                })}

            </div>
        )
    }
}


const AccordionProyecto = ({ proyecto }) => {// recibe como prop o input cada proyecto 

    const [showDialog, setShowDialog] = useState(false);// estado para permitir mostrar un dialog

    // const [editMode, setEditMode] = useState(false)

    return (
        <div className='p-10 '>

            <AccordionStyled>

                <AccordionSummaryStyled className='bg-red-500  ' expandIcon={<i className='fas fa-chevron-down' />}>
                    <div className='flex  w-full justify-between'>{/** uppercase me pone todo en mayusculas*/}
                        <div className='uppercase font-bold text-gray-100  '>
                            {proyecto.nombre} - {proyecto.estado} - fase: {proyecto.fase}
                            {/* {!editMode ?
                                (
                                    <span>{proyecto.estado}</span>
                                ) : (
                                    <div>
                                        <select name="" id="">
                                            <option value=""></option>
                                            <option value=""></option>
                                            <option value=""></option>

                                        </select>
                                    </div>
                                )} */}

                        </div>


                    </div>
                </AccordionSummaryStyled>
                <AccordionDetailsStyled>
                    <PrivateComponent roleList={['ADMINISTRADOR']}> {/**solo el administrador puede cambiar el estado de un proyecto 
                     * de inactivo a activo siempre y cuando la fase no este en terminado 
                     */}
                        <i className='fas fa-pen mx-4 text-blue-700 hover:text-blue-500'
                            onClick={() => {
                                setShowDialog(true);// cuando le damos click al lapiz me ejecuta el setEditMode y puedo editar el estado de un 
                                // proyecto 
                            }}
                        />
                    </PrivateComponent>
                    <PrivateComponent roleList={['ESTUDIANTE']}>
                        <InscripcionProyecto //componente que me ejecuta la mutacion de crear inscripcion a un proyecto 
                            idProyecto={proyecto._id} // props id de los proyectos 
                            estado={proyecto.estado}
                            inscripciones={proyecto.inscripciones}// prop de inscripciones le paso la informacion traida con le 
                        // query de proyectos de las inscripciones a cada proyecto para evaluar si ya se esta incrito en un proyecto 
                        // y deshabilitar el boton y mostrar mensaje de que ya se esta inscrito en el proyecto 
                        />
                    </PrivateComponent>
                    <div>
                        Liderado por: {proyecto.lider.correo}
                    </div>
                    <div>
                        {proyecto.objetivos.map((objetivo) => {
                            return (

                                <Objetivo key={nanoid()} tipo={objetivo.tipo} descripcion={objetivo.descripcion} />
                            )
                        })}
                    </div>

                </AccordionDetailsStyled>

            </AccordionStyled>

            <Dialog
                open={showDialog}
                onClose={() => {
                    setShowDialog(false);
                }}>
                <FormEditProyecto _id={proyecto._id} />
            </Dialog>
        </div>
    )
}


const FormEditProyecto = ({ _id }) => {

    const { form, formData, updateFormData } = useFormData();
    const [editarProyecto, { data: dataMutation, loading, error }] = useMutation(EDITAR_PROYECTO);



    const submitForm = (e) => {
        e.preventDefault();
        editarProyecto({
            variables: {
                _id,
                estado: formData.estado,
            },
        });
    };

    useEffect(() => {
        console.log('data mutation', dataMutation);
    }, [dataMutation]);

    return (

        <div className='p-4 ' >
            <h1 className='font-bold'>Modificar el estado del proyecto </h1>

            <form
                ref={form}
                onChange={updateFormData}
                onSubmit={submitForm}
                action=""
                className='flex flex-col items-center'>

                <DropDown label='Estado del Proyecto' name='estado' options={Enum_EstadoProyecto} /> {/** el name del dropdow debe ser
                 * igual a campo  que se quiere modificar en la base de datos 
                */}

                <ButtonLoading disabled={false} loading={loading} text='Confirmar' />

            </form>

        </div>

    )
}

const Objetivo = ({ tipo, descripcion }) => {
    return (
        <div className=' mx-5  my-4 bg-gray-100 p-8 rounded-lg shadow-2xl '>
            <div className='text-black font-bold'>
                {tipo}
            </div>
            <div>
                {descripcion}
            </div>
        </div>
    )
}

const InscripcionProyecto = ({ idProyecto, estado, inscripciones }) => {
    const [estadoInscripcion, setEstadoInscripcion] = useState('');// guardare el estado de la inscripcion existente retornada por el filter
    const [crearInscripcion, { data, loading, error }] = useMutation(CREAR_INSCRIPCION);
    const { userData } = useUser();// permite traer la informacion del usuario que ah  iniciado sesion
    // console.log("datos del usuario que inicio sesion :", userData)
    // console.log("idproyecto", idProyecto)
    console.log("Inscripciones al proyecto: ", inscripciones)






    useEffect(() => {
        if (userData && inscripciones) { // me valida  que exista y tenga contenido las variables userData e inscripciones y si 
            // tiene contenido hace el filtro siguiente 
            const filtro = inscripciones.filter((el) => el.estudiante._id === userData._id);// el metodo filter itera todo el 
            // array de inscripciones y valida a cada elemento del array cumpla con la condicion o funcion dentro de los 
            // parentesis del metodo filter(condicion) y en el ejemplo la condicion es (el) => el.estudiante._id === userData._id
            // de cada elemento (el) de la inscripcion, cada elemento es un objeto de inscripcion y miro la propiedad estudiante y luego 
            // su id y lo comparo con el id del usuario que inicio sesion y si es igual me lo retorna en la varible filtro 
            // console.log ("filtro: ", filtro)

            if (filtro.length > 0) { // tengo que validar si la lista del filtro no esta vacia para evitar los null si esta vacia no 
                // podre acceder obviamente a su propiedad estado dado que no existe 
                setEstadoInscripcion(filtro[0].estado);//guardo el estado de la primera inscripcion  es decir la inscripcion 
                // en la posicion 0 del array retornado del filter en el estado 
            }
        }
    }, [userData, inscripciones]);

    useEffect(() => {
        if (data) {// data es la respuesta de la api a la mutacion de crear incripcion
            console.log("Datos retornados de la mutacion crear inscripcion: ", data);

            toast.success('inscripcion creada con exito');
        }
    }, [data]);

    const confirmarInscripcion = () => {
        //   crearInscripcion({ variables: { proyecto: idProyecto, estudiante: userData._id } });// ejecuta la mutacion y le paso las 
        //   varibles para crear una inscripcion  
        crearInscripcion({ variables: { proyecto: idProyecto } });// ejecuta la mutacion y le paso las 
        //   varibles para crear una inscripcion 

        console.log("estado inscripcio: ")
    };

    return (
        <>

            {estadoInscripcion !== '' ? ( // renderizacion condicional si hay datos en el estadoIncripcion muestra el Span si no muestra el boton 
                // de inscripcion 
                <span>Ya estas inscrito en este proyecto y el estado es {estadoInscripcion}</span>
            ) : (
                <ButtonLoading
                    onClick={() => confirmarInscripcion()}
                    disabled={estado === 'INACTIVO'}// me permite bloquear el boton de inscribirme en un proyecto si 
                    // el estado del proyecto esta inactivo 
                    loading={loading}
                    text='Inscribirme en este proyecto'
                />
            )}
        </>
    );
};

export default IndexProyectos
