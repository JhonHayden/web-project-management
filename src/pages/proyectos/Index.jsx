import React, { useEffect, useState } from 'react'
import 'styles/globals.css';
import { PROYECTOS } from 'graphql/proyectos/queries';
import { Dialog } from '@mui/material';
import { Enum_EstadoProyecto } from 'utils/enums';
import DropDown from 'components/Dropdown';
import ButtonLoading from 'components/ButtonLoading';
import { EDITAR_PROYECTO, EDITAR_OBJETIVO, EDITAR_PROYECTO_ROL_LIDER } from 'graphql/proyectos/mutations';
import useFormData from 'hooks/useFormData';
import { useMutation, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';// me permite navegar a otras paginas 
import PrivateComponent from 'components/PrivateComponent';
import { CREAR_INSCRIPCION } from 'graphql/inscripciones/mutaciones';
import { useUser } from 'context/userContext';
import { toast } from 'react-toastify';
import { nanoid } from 'nanoid';
import Input from 'components/Input';// componente input
import {
    AccordionStyled,
    AccordionSummaryStyled,
    AccordionDetailsStyled,
} from 'components/Accordion';


const IndexProyectos = () => {

    const { data: queryData, loading, error, refetch } = useQuery(PROYECTOS);// ejecuta el query de proyectos 


    useEffect(() => {
        console.log('datos proyecto', queryData);
    }, [queryData]);

    if (loading) return <div>Cargando...</div>;//



    if (queryData) {


        if (queryData.Proyectos) {

            return (
                <div className='p-4 flex flex-col'>
                    <div className='self-center'>
                        <h1 className='text-2xl font-extrabold text-gray-900'>Lista de proyectos </h1>
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
                            <div
                                key={proyecto._id}
                                className=' items-center  gap-2 rounded-md'>
                                <AccordionProyecto

                                    proyecto={proyecto}
                                    refetch={refetch} />
                            </div>
                        )
                    })}

                </div>
            )
        } else {

            return (

                <div>No  hay proyectos </div>
            )
        }

    } else {

        return (

            <div>No  hay proyectos en la base de datos  </div>
        )
    }

}


const AccordionProyecto = ({ proyecto, refetch }) => {// recibe como prop o input cada proyecto 

    const [mostrarFormEditarEstadoProjectRolAdmin, setMostrarFormEditarEstadoProjectRolAdmin] = useState(false);// estado para permitir mostrar un dialog
    const [mostrarFormEditarProjectRolLider, setMostrarFormEditarProjectRolLider] = useState(false);// estado para permitir mostrar un dialog
    const [mostrarEdiccionFaseATerminado, setMostrarEdiccionFaseATerminado] = useState(false);// estado para permitir mostrar un dialog
// const [cantidadAvances,setCantidadAvances] = useState(0)
    // const [editMode, setEditMode] = useState(false)



    return (
        <div className='p-10 '>

            <AccordionStyled>

                <AccordionSummaryStyled expandIcon={<i className='fas fa-chevron-down' />}>
                    <div className='flex  w-full justify-between'>{/** uppercase me pone todo en mayusculas*/}
                        <div className=' flex flex-col uppercase font-bold text-gray-100  '>
                            <div className='flex'>
                                <div className='mt-1 text-gray-50 mx-2'>
                                    Nombre proyecto:
                                </div>
                                <div className=' text-xl text-gray-50 mx-2'>
                                    {proyecto.nombre}

                                </div>
                            </div>
                            <div className='flex'>
                                <div className='mt-1 text-gray-50 mx-2'>
                                    Fecha inicio:
                                </div>
                                <div className=' text-xl text-gray-50 mx-2'>
                                    {proyecto.fechaInicio}

                                </div>
                            </div>
                            <div className='flex'>
                                <div className='mt-1 text-gray-50 mx-2'>
                                    Fecha fin:
                                </div>
                                <div className=' text-xl text-gray-50 mx-2'>
                                    {proyecto.fechaFin}


                                </div>
                            </div>
                            <div className='flex'>
                                <div className='mt-1 text-gray-50 mx-2'>
                                    Presupuesto:
                                </div>
                                <div className=' text-xl text-gray-50 mx-2'>
                                    {proyecto.presupuesto}


                                </div>
                            </div>
                            <div className='flex'>
                                <div className='mt-1 text-gray-50 mx-2'>
                                    Estado:
                                </div>
                                <div className=' text-xl text-gray-50 mx-2'>
                                    {proyecto.estado}


                                </div>
                            </div>
                            <div className='flex'>
                                <div className='mt-1 text-gray-50 mx-2'>
                                    Fase:
                                </div>
                                <div className=' text-xl text-gray-50 mx-2'>
                                    {proyecto.fase}
                                </div>
                            </div>
                            <div className='flex'>
                                <div className='mt-1 text-gray-50 mx-2'>
                                    Lider:
                                </div>
                                <div className=' text-xl text-gray-50 mx-2'>
                                    <span className='mr-1'>
                                        {proyecto.lider.nombre}
                                    </span>
                                    <span>
                                        {proyecto.lider.apellido}
                                    </span>


                                </div>
                            </div>

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
                        <div>
                            {/* {proyecto.avances && proyecto.avances.map((el, index) => {
                                const x=index+1
                                setCantidadAvances(x)

                            })} */}
                             <PrivateComponent roleList={['LIDER']}>
                            <Link to={`/proyectosinscritos/avances/${proyecto._id}`}>
                                {/* <span className='uppercase font-bold text-gray-100  '>Avances( {cantidadAvances})</span> */}
                                <span className='uppercase font-bold text-gray-100  '>Avances ({proyecto.avances.length})</span>
                            </Link>
                            </PrivateComponent>
                        </div>
                    </div>
                </AccordionSummaryStyled>
                <AccordionDetailsStyled>
                    <PrivateComponent roleList={['ADMINISTRADOR']}> {/**solo el administrador puede cambiar el estado de un proyecto 
                     * de inactivo a activo siempre y cuando la fase no este en terminado 
                     */}
                        <div className='flex justify-between'>
                            <ButtonLoading
                                loading={false}
                                text='Editar estado'
                                onClick={() => {
                                    setMostrarFormEditarEstadoProjectRolAdmin(true);
                                }}
                            />

                            {proyecto.fase === 'EN_DESARROLLO' ? (

                                <ButtonLoading
                                    loading={false}
                                    text='Editar fase'
                                    onClick={() => {
                                        setMostrarEdiccionFaseATerminado(true);
                                    }}
                                />

                            ) : (
                                <></>
                            )}

                        </div>

                    </PrivateComponent>
                    <PrivateComponent roleList={['LIDER']}> {/**solo el administrador puede cambiar el estado de un proyecto 
                     * de inactivo a activo siempre y cuando la fase no este en terminado 
                     */}

                        <ButtonLoading
                            disabled={proyecto.estado === 'ACTIVO' ? false : true}
                            loading={false}
                            text='Editar Proyecto'
                            onClick={() => {
                                setMostrarFormEditarProjectRolLider(true);// cuando le damos click al lapiz me ejecuta el setEditMode y puedo editar el estado de un 
                            }}
                        />

                    </PrivateComponent>
                    <PrivateComponent roleList={['ESTUDIANTE']}>
                        <InscripcionProyecto //componente que me ejecuta la mutacion de crear inscripcion a un proyecto 
                            idProyecto={proyecto._id} // props id de los proyectos 
                            estadoProyecto={proyecto.estado}
                            proyectoInscripciones={proyecto.inscripciones}// prop de inscripciones le paso la informacion traida con le 
                        // query de proyectos de las inscripciones a cada proyecto para evaluar si ya se esta incrito en un proyecto 
                        // y deshabilitar el boton y mostrar mensaje de que ya se esta inscrito en el proyecto 
                        />
                    </PrivateComponent>
                    <div className='font-semibold'>
                        <span className='mx-1'>

                            Correo del lider:
                        </span>
                        <span>

                            {proyecto.lider.correo}
                        </span>
                    </div>
                    <div>
                        {proyecto.objetivos.map((objetivo, index) => {

                            const indexObjetivo = index;
                            // console.log(indexObjetivo)

                            return (

                                <Objetivo
                                    key={objetivo._id}
                                    tipo={objetivo.tipo}
                                    descripcion={objetivo.descripcion}
                                    idProyecto={proyecto._id}
                                    estadoProyecto={proyecto.estado}
                                    refetch={refetch}
                                    indexObjetivo={indexObjetivo} />
                            )
                        })}
                    </div>

                </AccordionDetailsStyled>

            </AccordionStyled>

            <Dialog
                open={mostrarFormEditarEstadoProjectRolAdmin}
                onClose={() => {
                    setMostrarFormEditarEstadoProjectRolAdmin(false);
                }}>
                <FormEditProyectoRolAdmin _id={proyecto._id} />
            </Dialog>
            <Dialog
                open={mostrarFormEditarProjectRolLider}
                onClose={() => {
                    setMostrarFormEditarProjectRolLider(false);
                }}>
                <FormEditProyectoRolLider
                    _id={proyecto._id}
                    nombreProyecto={proyecto.nombre}
                    presupuesto={proyecto.presupuesto}
                    refetch={refetch}
                    setMostrarFormEditarProjectRolLider={setMostrarFormEditarProjectRolLider}
                />
            </Dialog>
            <Dialog
                open={mostrarEdiccionFaseATerminado}
                onClose={() => {
                    setMostrarEdiccionFaseATerminado(false);
                }}>
                <FormEditFaseProyectoATerminado
                    _id={proyecto._id}
                    nombreProyecto={proyecto.nombre}
                    presupuesto={proyecto.presupuesto}
                    refetch={refetch}
                    setMostrarEdiccionFaseATerminado={setMostrarEdiccionFaseATerminado}
                />
            </Dialog>



        </div>
    )
}


const FormEditProyectoRolAdmin = ({ _id }) => {

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



const FormEditFaseProyectoATerminado = ({ _id, setMostrarEdiccionFaseATerminado, refetch }) => {

    const [editarProyecto, { data: dataMutation, loading, error }] = useMutation(EDITAR_PROYECTO);
    const [confirmacionTerminarProyecto, setConfirmacionTerminarProyecto] = useState(false)



    // useEffect(() => {
    //     if(confirmacionTerminarProyecto){

    //         setMostrarEdiccionFaseATerminado(false)
    //     }
    // }, [confirmacionTerminarProyecto])

    const terminarProyecto = () => {


        // setConfirmacionTerminarProyecto(true)
        editarProyecto({
            variables: {
                _id,
                fase: 'TERMINADO',
            },
        });
    };

    useEffect(() => {

        if (dataMutation) {

            refetch()
        }
        // console.log('data mutation', dataMutation);
    }, [dataMutation]);

    return (

        <div className='p-4 flex flex-col justify-items-center' >
            <h1 className='font-bold m-2'>Actualizar proyecto a terminado </h1>


            <div>{
                !confirmacionTerminarProyecto ? (
                    <button
                        className='bg-blue-600 text-white font-bold text-lg py-3 px-6 ml-6 rounded-xl hover:bg-blue-800 shadow-md '
                        onClick={() => {
                            setConfirmacionTerminarProyecto(true)
                        }}>Terminar Proyecto</button>

                ) : (
                    <></>
                )
            }
            </div>
            {confirmacionTerminarProyecto ?
                (
                    <ButtonLoading
                        disabled={false}
                        loading={loading}
                        text='Confirmar'
                        onClick={() => {
                            terminarProyecto()
                        }} />
                ) :
                (
                    <></>
                )

            }



        </div>

    )
}


const FormEditProyectoRolLider = ({
    _id,
    nombreProyecto,
    presupuesto,
    refetch,
    setMostrarFormEditarProjectRolLider }) => {

    const { form, formData, updateFormData } = useFormData();
    const [editarProyecto, { data: dataMutation, loading, error }] = useMutation(EDITAR_PROYECTO_ROL_LIDER);

    useEffect(() => {
        if (dataMutation) {
            toast.success('Proyecto editado con exito');
            refetch(); // pendiente para agregar y que me muestre los avances 
            setMostrarFormEditarProjectRolLider(false)
        }
    }, [dataMutation])

    useEffect(() => {
        if (error) {
            toast.error('Error editando proyecto');
        }
    }, [error]);


    const submitForm = (e) => {
        e.preventDefault();

        formData.presupuesto = parseFloat(formData.presupuesto);

        editarProyecto({
            variables: {
                _id,
                nombre: formData.nombre,
                presupuesto: formData.presupuesto,
            },
        });
    };

    useEffect(() => {
        console.log('data mutation', dataMutation);
    }, [dataMutation]);

    return (

        <div className='p-4 ' >
            <h1 className='font-bold'>Editar proyecto </h1>

            <form
                ref={form}
                onChange={updateFormData}
                onSubmit={submitForm}
                action=""
                className='flex flex-col items-center'>
                <Input
                    name='nombre'
                    label='Nombre del Proyecto'
                    required={true}
                    type='text'
                    defaultValue={nombreProyecto} />
                <Input
                    name='presupuesto'
                    label='Presupuesto del Proyecto'
                    required={true}
                    type='number'
                    defaultValue={presupuesto} />



                <ButtonLoading disabled={false} loading={loading} text='Confirmar' />

            </form>

        </div>

    )
}





const Objetivo = ({
    idProyecto,
    indexObjetivo,
    tipo,
    descripcion,
    estadoProyecto,
    refetch }) => {

    const [mostrarFormEditObjetivo, setMostrarFormEditObjetivo] = useState(false)



    return (
        <div className=' mx-5  my-4 bg-gray-100 p-8 rounded-lg shadow-2xl '>
            <div className='text-black font-bold'>
                <span className='mx-1'>

                    Tipo de objetivo:
                </span>
                <span>

                    {tipo}
                </span>
            </div>
            <div>
                <span className='mx-1'>
                    Descripción:
                </span>
                <span>
                    {descripcion}
                </span>
            </div>
            <div>
                <PrivateComponent roleList={['LIDER']}>
                    <ButtonLoading
                        disabled={estadoProyecto === 'ACTIVO' ? false : true}
                        loading={false}
                        text='Editar Objetivo'
                        onClick={() => {
                            setMostrarFormEditObjetivo(true);// cuando le damos click al lapiz me ejecuta el setEditMode y puedo editar el estado de un 
                        }}
                    />
                </PrivateComponent>
            </div>

            <Dialog
                open={mostrarFormEditObjetivo}
                onClose={() => {
                    setMostrarFormEditObjetivo(false);
                }}>
                <FormEditObjetivosRolLider
                    idProyecto={idProyecto}
                    descripcion={descripcion}
                    refetch={refetch}
                    setMostrarFormEditObjetivo={setMostrarFormEditObjetivo}
                    indexObjetivo={indexObjetivo}
                />
            </Dialog>

        </div>
    )
}


const FormEditObjetivosRolLider = ({ idProyecto, descripcion, refetch, setMostrarFormEditObjetivo, indexObjetivo }) => {

    const { form, formData, updateFormData } = useFormData();
    const [editarProyecto, { data: dataMutation, loading, error }] = useMutation(EDITAR_OBJETIVO);

    useEffect(() => {
        if (dataMutation) {
            toast.success('Objetivo editado con exito');
            refetch(); // pendiente para agregar y que me muestre los avances 
            setMostrarFormEditObjetivo(false)
        }
    }, [dataMutation])

    useEffect(() => {
        if (error) {
            toast.error('Error editando Objetivo');
        }
    }, [error]);


    const submitForm = (e) => {
        e.preventDefault();


        editarProyecto({
            variables: {
                idProyecto,
                indexObjetivo,
                campos: formData

            },
        });
    };

    useEffect(() => {
        console.log('data mutation', dataMutation);
    }, [dataMutation]);



    return (



        <div>
            <div className='p-4 ' >
                <h1 className='font-bold'>Editar Objetivo</h1>

                <form
                    ref={form}
                    onChange={updateFormData}
                    onSubmit={submitForm}
                    action=""
                    className='flex flex-col items-center'>
                    <label htmlFor='descripcion' className='flex flex-col my-3'>
                        <span>Descripción Objetivo:</span>
                        <textarea
                            className='border'
                            name="descripcion"
                            id=""
                            cols="50"
                            rows="10"
                            required
                            defaultValue={descripcion}>

                        </textarea>
                    </label>


                    <ButtonLoading disabled={false} loading={loading} text='Confirmar' />

                </form>

            </div>
        </div>
    )
}



const InscripcionProyecto = ({ idProyecto, estadoProyecto, proyectoInscripciones }) => {
    const [estadoInscripcion, setEstadoInscripcion] = useState('');// guardare el estado de la inscripcion existente retornada por el filter
    const [crearInscripcion, { data, loading, error }] = useMutation(CREAR_INSCRIPCION);
    const { userData } = useUser();// permite traer la informacion del usuario que ah  iniciado sesion
    // console.log("datos del usuario que inicio sesion :", userData)
    // console.log("idproyecto", idProyecto)
    console.log("proyectoInscripciones al proyecto: ", proyectoInscripciones)






    useEffect(() => {
        if (userData && proyectoInscripciones) { // me valida  que exista y tenga contenido las variables userData e proyectoInscripciones y si 
            // tiene contenido hace el filtro siguiente 
            // const filtro = proyectoInscripciones.filter((el) => el.estudiante._id === userData._id);// el metodo filter itera todo el 
            // // array de proyectoInscripciones y valida a cada elemento del array cumpla con la condicion o funcion dentro de los 
            // // parentesis del metodo filter(condicion) y en el ejemplo la condicion es (el) => el.estudiante._id === userData._id
            // // de cada elemento (el) de la inscripcion, cada elemento es un objeto de inscripcion y miro la propiedad estudiante y luego 
            // // su id y lo comparo con el id del usuario que inicio sesion y si es igual me lo retorna en la varible filtro 
            // // console.log ("filtro: ", filtro)

            // if (filtro.length > 0) { // tengo que validar si la lista del filtro no esta vacia para evitar los null si esta vacia no 
            //     // podre acceder obviamente a su propiedad estado dado que no existe 
            //     setEstadoInscripcion(filtro[0].estadoProyecto);//guardo el estado de la primera inscripcion  es decir la inscripcion 
            //     // en la posicion 0 del array retornado del filter en el estado 
            // }
        }
    }, [userData, proyectoInscripciones]);

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
                    disabled={estadoProyecto === 'INACTIVO'}// me permite bloquear el boton de inscribirme en un proyecto si 
                    // el estadoProyecto del proyecto esta inactivo 
                    loading={loading}
                    text='Inscribirme en este proyecto'
                />
            )}
        </>
    );
};

export default IndexProyectos
