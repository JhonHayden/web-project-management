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
        refetch } = useQuery(GET_AVANCES, { variables: { idProyecto } })


    useEffect(() => {
        console.log("dataQueryAvances: ", dataQueryAvances)
    }, [dataQueryAvances])

    if (loadingQueryAvances) return <div>Cargando...</div>;//

    if (dataQueryAvances.Avances) {

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
                    <h1 className='text-2xl font-extrabold text-gray-900'>Lista de Avances </h1>
                </div>

                {dataQueryAvances.Avances.map((avance) => {

                    return (

                        <AccordionAvance
                            key={nanoid()}
                            avance={avance}
                            refetch={refetch} />
                    )
                })}


            </div>
        )
    } else {

        return (

            <div> el proyecto no tiene avances registrados </div>
        )
    }


}

const AccordionAvance = ({ avance, refetch }) => {

    const [showDialog, setShowDialog] = useState(false);// estado para permitir mostrar un dialog
    const [mostrarFormularioObservaciones, setMostrarFormularioObservaciones] = useState(false);// estado para permitir mostrar un dialog

    return (


        <div>
            <div className='p-10 '>
                <AccordionStyled>
                    <AccordionSummaryStyled className='bg-red-500  ' expandIcon={<i className='fas fa-chevron-down' />}>
                        <div className='flex  w-full justify-between'>{/** uppercase me pone todo en mayusculas*/}
                            <div className='uppercase font-bold text-gray-100  '>
                                <div>
                                    Fecha: {avance.fecha}
                                </div>
                                <div>
                                    Proyecto: {avance.proyecto.nombre}
                                </div>

                            </div>
                        </div>
                    </AccordionSummaryStyled>
                    <AccordionDetailsStyled>
                        <div className='flex justify-between '>
                            <PrivateComponent roleList={['ESTUDIANTE']}> {/**  */}
                                <ButtonLoading
                                    disabled={false}
                                    loading={false}
                                    text='Editar Avance '
                                    onClick={() => {
                                        setShowDialog(true);
                                    }}
                                />
                            </PrivateComponent>
                            <PrivateComponent roleList={['LIDER']}> {/**  */}
                                <div>

                                    <ButtonLoading
                                        disabled={false}
                                        loading={false}
                                        text='Editar Observación'
                                        onClick={() => {
                                            setShowDialog(true);
                                        }}
                                    />
                                </div>
                                <div>
                                    <ButtonLoading
                                        disabled={false}
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


                        <div>
                           Avance creado por: {avance.creadoPor.nombre}
                        </div>
                        <div>
                            Descripción del avance: {avance.descripcion}
                        </div>
                        <div>
                            <h1>Observaciones del lider:</h1>
                            {avance.observaciones ? (avance.observaciones.map((observacion, index) => {

                                const x = index + 1

                                return (
                                    <div>
                                        <div>
                                            {x}: {observacion.descripcionObservacion}
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
                            refetch={refetch} />
                    </PrivateComponent>
                    <PrivateComponent roleList={['LIDER']}>
                        <FormEditAvanceLider _id={avance._id} // componente de formulario de editar un avance Rol Lider 
                        />
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
                            refetch={refetch}

                        />
                    </div>
                </Dialog>
            </div>
        </div>
    )
}

const FormEditAvanceEstudiante = ({ _id, fecha, descripcion, setShowDialog, refetch }) => {

    const { form, formData, updateFormData } = useFormData();
    const [editarAvance, { data: dataMutation, loading, error }] = useMutation(EDITAR_AVANCE);



    useEffect(() => {
        if (dataMutation) {
            toast.success('Avance editado con exito');
            //   refetch(); // pendiente para agregar y que me muestre los avances 
            setShowDialog(false)
            refetch()
        }
    }, [dataMutation]);

    useEffect(() => {
        if (error) {
            toast.error('Error editando el avance');
        }
    }, [error]);

    const submitForm = (e) => {
        e.preventDefault();
        console.log("formData de avance", formData)
        console.log("id avance", _id)

        editarAvance({
            variables: {
                _id,
                fecha: formData.fecha,
                descripcion: formData.descripcion,
            },
        });
    };

    useEffect(() => {
        console.log('data mutation', dataMutation);
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
                <ButtonLoading disabled={false} loading={false} text='Confirmar' />

            </form>

        </div>

    )
}


const FormEditAvanceLider = ({ _id }) => {

    const { form, formData, updateFormData } = useFormData();
    const [editarAvance, { data: dataMutation, loading, error }] = useMutation(EDITAR_AVANCE);



    const submitForm = (e) => {
        e.preventDefault();
        editarAvance({
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
            <h1 className='font-bold'>Editar Avance </h1>

            <form
                ref={form}
                onChange={updateFormData}
                onSubmit={submitForm}
                action=""
                className='flex flex-col items-center'>



                <ButtonLoading disabled={false} loading={false} text='Confirmar' />

            </form>

        </div>

    )
}


const FormAgregarObservacion = ({ idAvance, setMostrarFormularioObservaciones, refetch }) => {

    const { form, formData, updateFormData } = useFormData();


    const [crearObservacion, { data, loading, error }] = useMutation(CREAR_OBSERVACION);



    useEffect(() => {
        if (data) {
            toast.success('Observación creada con exito');
            refetch(); // pendiente para agregar y que me muestre los avances 
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

        console.log("observaciones que agregare", formData)



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
                <ButtonLoading text='Crear Observacion' loading={false} disabled={false} />
            </form>

        </div>
    )
}




// const Observacion = () => {
//     const [listaObservaciones, setListaObservaciones] = useState([]);


//     const eliminarObservacion = (id) => {

//         setListaObservaciones(listaObservaciones.filter((el) => el.props.id !== id));
//     };

//     const componenteObservacionAgregadoaLista = () => {

//         const id = nanoid();// nanoid es una libreria que genera id aleatorios y unicos 

//         return (
//             //            //   props    //
//             <FormObservacion key={id} id={id} />// key me permite que react identifique cual componente 
//             // es por que cada componente FormObservacion  tendra un id y asi luego poder implementar la 
//             // eliminacion por el boton de menos 
//         )

//     }
//     return (
//         <ObservacionContext.Provider value={{ eliminarObservacion }}> {/**contexto para poder pasar la funcion de eliminar como 
//          * prop (value={{ eliminarObservacion  }}) y asi todo lo que este dentro de este contexto ObjContext.Provider puede utilizar 
//          * esta funcion  eliminarObservacion 
//          */}
//             <div>
//                 <div >
//                     <div className='flex'>
//                         <h1>
//                             Observaciones
//                         </h1 >

//                         <i className='fas fa-plus rounded-full bg-green-500 hover:bg-green-400 text-white p-2 mx-2 cursor-pointer'
//                             onClick={() => {
//                                 setListaObservaciones([...listaObservaciones, componenteObservacionAgregadoaLista()])
//                             }
//                             }// Cada ves que le de click en el icono de fas fa-plus
//                         // se ejecuta la funcion setListaObservaciones y ella me guarda un array, una lista con  todo lo que 
//                         // ya tiene guardado antes, esto es gracias al spread operator (...),  mas algo nuevo 
//                         />
//                     </div>

//                     {listaObservaciones.map((Observacion) => { // me recorre la lista de Observaciones y me muestra todo lo del  return cada vez
//                         // recorre un elemento es decir cada elemento es un bloque de return que se renderiza y se muestra   
//                         return (
//                             Observacion
//                         )
//                     })}
//                 </div>

//             </div>
//         </ObservacionContext.Provider>

//     )
// }

// const FormObservacion = ({ id }) => {

//     const { eliminarObservacion } = useObservacionContext();// forma para permitir usar la funcion de eliminarObservacion 

//     return (
//         <div className='flex'>
//             {/* <Input name='descripcion' label='Descripcion' required={true} type='text' // componente input  */}

//             <div className='w-full'>
//                 <Input
//                     name={`nested||Observacion||${id}||descripcionObservacion`}// el name debe ser en este formato para trabajar el userFormData
//                     // despues del nested sigue el campo con el nombre igual en la base de datos de array embebido  en este caso es Observacion s 
//                     // y luego el id y seguido el campo igual que en la base de datos tiene cada Observacion  como uno de sus dos atributos la descripcion 

//                     label='Descripcion Observacion'
//                     required={true}
//                     type='text' // componente input 
//                 />
//             </div>



//             <i
//                 onClick={() => eliminarObservacion(id)}//cuando le den click en el botton de menos de cada Observacion  se 
//                 // ejecuta la funcion de eliminarObservacion 
//                 className='fas fa-minus rounded-full bg-red-500 hover:bg-red-400 text-white p-2 my-8 cursor-pointer mx-8' />

//         </div>

//     )
// }
export default AvancesAProyecto
