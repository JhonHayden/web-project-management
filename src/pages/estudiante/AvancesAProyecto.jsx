import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client';
import { GET_AVANCES } from 'graphql/avances/queries';
import { useParams, Link } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { EDITAR_AVANCE } from 'graphql/avances/mutaciones';
import useFormData from 'hooks/useFormData';
import ButtonLoading from 'components/ButtonLoading';
import { Dialog } from '@mui/material';
import PrivateComponent from 'components/PrivateComponent';
import Input from 'components/Input';// componente input
import { toast } from 'react-toastify';
import {
    AccordionStyled,
    AccordionSummaryStyled,
    AccordionDetailsStyled,
} from 'components/Accordion';
import { ObservacionContext } from 'context/observacionContext';
import { useObservacionContext } from 'context/observacionContext';
import { CREAR_OBSERVACION } from 'graphql/avances/mutaciones';
import { EDITAR_OBSERVACION } from 'graphql/avances/mutaciones';
import { GET_PROYECTO } from 'graphql/proyectos/queries';
import { AccordionStyledPadre } from 'components/Accordion';
import { AccordionSummaryStyledPadre } from 'components/Accordion';
import { AccordionDetailsStyledPadre } from 'components/Accordion';



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
        error: errorQueryAvances,
        refetch:refetchAvances } = useQuery(GET_AVANCES, { variables: { idProyecto } })


    const {
        data: dataQueryProyecto,
        loading: loadingQueryProyecto,
        error: errorQueryProyecto,
        refetch:refetchProyecto } = useQuery(GET_PROYECTO, { variables: { idProyecto } })


useEffect(() => {
    refetchAvances()
    refetchProyecto()
}, [])

    useEffect(() => {
        // console.log(dataQueryProyecto)
    }, [dataQueryProyecto])
    useEffect(() => {
        // console.log("dataQueryAvances: ", dataQueryAvances)
    }, [dataQueryAvances])

    if (loadingQueryAvances) return <div>Cargando...</div>;//

    if (dataQueryAvances.Avances && dataQueryProyecto) {

        return (
            <div className='p-4 flex flex-col'>
                <PrivateComponent roleList={['ESTUDIANTE']}>

                    <Link to='/proyectosinscritos'>
                        <i className='fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900' />
                    </Link>
                </PrivateComponent>
                <PrivateComponent roleList={['LIDER']}>

                    <Link to='/proyectos'>
                        <i className='fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900' />
                    </Link>
                </PrivateComponent>
                <div className='self-center'>
                    <h1 className='text-2xl font-extrabold text-gray-900'>Lista de Avances del proyecto: {dataQueryProyecto.Proyecto.nombre} </h1>
                    {/* <h1 className='text-2xl font-extrabold text-gray-900'>Lista de Avances del proyecto:  </h1> */}
                </div>

                <AccordionProyecto
                    dataQueryAvances={dataQueryAvances}
                    proyecto={dataQueryProyecto.Proyecto}
                    refetchAvances={refetchAvances}
                />

            </div>
        )
    } else {

        return (

            <div> </div>
        )
    }


}

const AccordionProyecto = ({ dataQueryAvances, proyecto, refetchAvances }) => {


    return (

        <div className='p-10 '>

            <AccordionStyledPadre>
                <AccordionSummaryStyledPadre expandIcon={<i className='fas fa-chevron-down text-white' />}>
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
                        </div>
                    </div>
                </AccordionSummaryStyledPadre>
                <AccordionDetailsStyledPadre>


                    <Avances
                        proyecto={proyecto}
                        dataQueryAvances={dataQueryAvances}
                        refetchAvances={refetchAvances}

                    />

                </ AccordionDetailsStyledPadre >
            </AccordionStyledPadre>

        </div>

    )

}

const Avances = ({ proyecto, dataQueryAvances, refetchAvances }) => {

    return (
        <div>

            {
                dataQueryAvances.Avances.map((avance) => {

                    return (

                        <AccordionAvance
                            key={nanoid()}
                            avance={avance}
                            refetchAvances={refetchAvances} />
                    )
                })
            }

        </div>
    )
}


const AccordionAvance = ({ avance, refetchAvances }) => {

    const [showDialog, setShowDialog] = useState(false);// estado para permitir mostrar un dialog
    const [mostrarFormularioObservaciones, setMostrarFormularioObservaciones] = useState(false);// estado para permitir mostrar un dialog

    return (


        <div>
            <div className='p-10 '>
                <AccordionStyled>
                    <AccordionSummaryStyled className='bg-red-500  ' expandIcon={<i className='fas fa-chevron-down' />}>
                        <div className='flex  w-full justify-between'>{/** uppercase me pone todo en mayusculas*/}
                            <div className='uppercase font-bold text-gray-100  '>
                                <div className='flex'>
                                    <div className='mt-1 text-gray-50 mx-2'>
                                        Fecha avance:
                                    </div>
                                    <div className=' text-xl text-gray-50 mx-2'>
                                        {avance.fecha}
                                    </div>
                                </div>
                                <div className='flex'>
                                    <div className='mt-1 text-gray-50 mx-2'>
                                        Avance creado por:
                                    </div>
                                    <div className=' text-xl text-gray-50 mx-2'>
                                        <span className='mr-1'>
                                            {avance.creadoPor.nombre}
                                        </span>
                                        <span>
                                            {avance.creadoPor.apellido}
                                        </span>
                                    </div>
                                </div>
                                <div>

                                </div>
                            </div>
                        </div>
                    </AccordionSummaryStyled>
                    <AccordionDetailsStyled>
                        <div className='flex justify-between '>
                            <PrivateComponent roleList={['ESTUDIANTE']}> {/**  */}
                                <ButtonLoading
                                    disabled={avance.proyecto.estado === 'ACTIVO' ? false : true}
                                    loading={false}
                                    text='Editar Avance '
                                    onClick={() => {
                                        setShowDialog(true);
                                    }}
                                />
                            </PrivateComponent>
                            <PrivateComponent roleList={['LIDER']}> {/**  */}
                                <div></div>
                                <div>
                                    <ButtonLoading
                                        disabled={avance.proyecto.estado === 'ACTIVO' ? false : true}
                                        loading={false}
                                        text='Agregar Observación'
                                        onClick={() => {
                                            setMostrarFormularioObservaciones(true);// cuando le damos click al lapiz me ejecuta el setEditMode y puedo editar el estado de un 
                                            // proyecto 
                                        }}
                                    />
                                </div>
                            </PrivateComponent>
                        </div>
                        <div className='flex flex-col'>
                            <div className=' text-xl text-gray-900 mx-2 font-bold self-center m-10'>
                                Descripción del avance
                            </div>
                            <div className='mt-1 text-gray-900 mx-2 font-semibold mb-6'>
                                {avance.descripcion}
                            </div>
                        </div>
                        <div className='flex flex-col mt-14'>
                            <h1 className='self-center font-bold text-xl mb-3'>Observaciones del lider</h1>
                            {avance.observaciones ? (avance.observaciones.map((observacion, index) => {

                                const x = index 

                                return (
                                    <div>
                                        <div>

                                            <Observacion
                                                key={observacion._id}
                                                indexObservacion={x}
                                                descripcionObservacion={observacion.descripcionObservacion}
                                                estadoProyecto={avance.proyecto.estado}
                                                idAvance={avance._id}
                                                refetchAvances={refetchAvances}


                                            />
                                        </div>

                                    </div>
                                    // <Observacion key={nanoid()} tipo={Observacion .tipo} descripcion={Observacion .descripcion} />
                                )
                            })
                            ) :
                                (

                                    <div>sin observaciones del lider aun </div>
                                )

                            }
                        </div>

                    </AccordionDetailsStyled>
                </AccordionStyled>

                <Dialog
                    open={showDialog}
                    onClose={() => {
                        setShowDialog(false);
                    }}>

                    <PrivateComponent roleList={['ESTUDIANTE']}> {/**  */}

                        <FormEditAvanceEstudiante // componente de formulario de editar un avance Rol Estudiante 
                            _id={avance._id}
                            fecha={avance.fecha}
                            descripcion={avance.descripcion}
                            setShowDialog={setShowDialog}
                            refetchAvances={refetchAvances}
                            estadoProyecto={avance.proyecto.estado} />
                    </PrivateComponent>


                </Dialog>
                <Dialog open={mostrarFormularioObservaciones}
                    onClose={() => {
                        setMostrarFormularioObservaciones(false);
                    }}>
                    <div className='p-5'>

                        <FormAgregarObservacion
                            idAvance={avance._id}
                            setMostrarFormularioObservaciones={setMostrarFormularioObservaciones}
                            refetchAvances={refetchAvances}
                            estadoProyecto={avance.proyecto.estado}

                        />
                    </div>
                </Dialog>
            </div>
        </div>
    )
}

const FormEditAvanceEstudiante = ({ _id, fecha, descripcion, setShowDialog, refetchAvances, estadoProyecto }) => {

    const { form, formData, updateFormData } = useFormData();
    const [editarAvance, { data: dataMutation, loading, error }] = useMutation(EDITAR_AVANCE);



    useEffect(() => {
        if (dataMutation) {
            toast.success('Avance editado con exito');
            //   refetchAvances(); // pendiente para agregar y que me muestre los avances 
            setShowDialog(false)
            refetchAvances()
        }
    }, [dataMutation]);

    useEffect(() => {
        if (error) {
            toast.error('Error editando el avance');
        }
    }, [error]);

    const submitForm = (e) => {
        e.preventDefault();
        // console.log("formData de avance", formData)
        // console.log("id avance", _id)

        editarAvance({
            variables: {
                _id,
                fecha: formData.fecha,
                descripcion: formData.descripcion,
            },
        });
    };

    useEffect(() => {
        // console.log('data mutation', dataMutation);
    }, [dataMutation]);

    return (

        <div className='p-4 ' >
            <h1 className='font-bold'>Editar Avance </h1>

            <form
                ref={form}
                onChange={updateFormData}
                onSubmit={submitForm}
                action=""
                className='flex flex-col items-center'>
                <Input name='fecha' label='Fecha' required={true} type='date' defaultValue={fecha} />
                <label htmlFor='descripcion' className='flex flex-col my-3'>
                    <span>Descripción Avance</span>
                    <textarea
                        className='border'
                        name="descripcion"
                        id=""
                        cols="50"
                        rows="10"
                        required
                        defaultValue={descripcion}></textarea>
                </label>
                <ButtonLoading
                    disabled={estadoProyecto === 'ACTIVO' ? false : true}
                    loading={false}
                    text='Confirmar' />

            </form>

        </div>

    )
}




const FormAgregarObservacion = ({ idAvance, setMostrarFormularioObservaciones, refetchAvances, estadoProyecto }) => {

    const { form, formData, updateFormData } = useFormData();


    const [crearObservacion, { data, loading, error }] = useMutation(CREAR_OBSERVACION);



    useEffect(() => {
        if (data) {
            toast.success('Observación creada con exito');
            refetchAvances(); // pendiente para agregar y que me muestre los avances
            setMostrarFormularioObservaciones(false)
        }
    }, [data])

    useEffect(() => {
        if (error) {
            toast.error('Error creando la observación');
        }
    }, [error]);


    const submitForm = (e) => {
        e.preventDefault();

        // console.log("observaciones que agregare", formData)



        crearObservacion({

            variables: {
                idAvance,
                descripcionObservacion: formData.descripcionObservacion

            }
        })

    }

    return (

        <div>
            <h1>
                Formulario de observaciones
            </h1>
            <form ref={form} onChange={updateFormData} onSubmit={submitForm}>

                <label htmlFor='descripcionObservacion' className='flex flex-col my-3'>
                    <span>Descripción Observación</span>
                    <textarea className='border' name="descripcionObservacion" id="" cols="50" rows="10" required></textarea>
                </label>
                <ButtonLoading
                    text='Crear Observacion'
                    loading={false}
                    disabled={estadoProyecto === 'ACTIVO' ? false : true}
                />
            </form>

        </div>
    )
}



const Observacion = ({
    indexObservacion,
    descripcionObservacion,
    estadoProyecto, idAvance, refetchAvances }) => {

    const [mostrarFormEditObservacion, setMostrarFormEditObservacion] = useState(false)



    return (
        <div className=' mx-5  my-4 bg-gray-100 p-8 rounded-lg shadow-2xl '>
            <div className='text-black font-bold'>
                <span className='mx-1'>
                    Observación {indexObservacion + 1}:
                </span>
                <span>
                    {descripcionObservacion}

                </span>
            </div>

            <div className='mt-11'>
                <PrivateComponent roleList={['LIDER']}>
                    <ButtonLoading
                        disabled={estadoProyecto === 'ACTIVO' ? false : true}
                        loading={false}
                        text='Editar Observacion'
                        onClick={() => {
                            setMostrarFormEditObservacion(true);// cuando le damos click al lapiz me ejecuta el setEditMode y puedo editar el estado de un 
                        }}
                    />
                </PrivateComponent>
            </div>

            <Dialog
                open={mostrarFormEditObservacion}
                onClose={() => {
                    setMostrarFormEditObservacion(false);
                }}>
                <FormEditObservacion
                    idAvance={idAvance}
                    descripcionObservacion={descripcionObservacion}
                    refetchAvances={refetchAvances}
                    setMostrarFormEditObservacion={setMostrarFormEditObservacion}
                    indexObservacion={indexObservacion}
                />
            </Dialog>

        </div>
    )
}

const FormEditObservacion = ({ idAvance, descripcionObservacion, refetchAvances, setMostrarFormEditObservacion, indexObservacion }) => {

    const { form, formData, updateFormData } = useFormData();
    const [editarProyecto, { data: dataMutation, loading, error }] = useMutation(EDITAR_OBSERVACION);

    useEffect(() => {
        if (dataMutation) {
            toast.success('Objetivo editado con exito');
            refetchAvances(); // pendiente para agregar y que me muestre los avances
            setMostrarFormEditObservacion(false)
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
                idAvance,
                indexObservacion,
                descripcionObservacion: formData.descripcionObservacion

            },
        });
    };

    useEffect(() => {
        // console.log('data mutation', dataMutation);
    }, [dataMutation]);



    return (



        <div>
            <div className='p-4 ' >
                <h1 className='font-bold'>Editar Observación</h1>

                <form
                    ref={form}
                    onChange={updateFormData}
                    onSubmit={submitForm}
                    action=""
                    className='flex flex-col items-center'>
                    <label htmlFor='descripcionObservacion' className='flex flex-col my-3'>
                        <span>Descripción Observación:</span>
                        <textarea
                            className='border'
                            name="descripcionObservacion"
                            id=""
                            cols="50"
                            rows="10"
                            required
                            defaultValue={descripcionObservacion}>

                        </textarea>
                    </label>


                    <ButtonLoading disabled={false} loading={loading} text='Confirmar' />

                </form>

            </div>
        </div>
    )
}

export default AvancesAProyecto
