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
                <Link to='/proyectosinscritos'>
                    <i className='fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900' />
                </Link>
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


                        <div>

                            <i className='fas fa-pen mx-4 text-blue-700 hover:text-blue-500'
                                onClick={() => {
                                    setShowDialog(true);// cuando le damos click al lapiz me ejecuta el setEditMode y puedo editar el estado de un 
                                    // proyecto 
                                }}
                            />

                        </div>

                        <div>
                            Creado por: {avance.creadoPor.nombre}
                        </div>
                        <div>
                            Descripción: {avance.descripcion}
                        </div>
                        <div>
                            {avance.observaciones ? (avance.observaciones.map((observacion) => {
                                return (

                                    <div>{observacion}</div>
                                    // <Observacion key={nanoid()} tipo={objetivo.tipo} descripcion={objetivo.descripcion} />
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


                    <FormEditAvanceEstudiante
                        _id={avance._id}
                        fecha={avance.fecha}
                        descripcion={avance.descripcion}
                        setShowDialog={setShowDialog}
                        refetch={refetch} />
                    <PrivateComponent roleList={['LIDER']}>
                        <FormEditAvanceLider _id={avance._id} />
                    </PrivateComponent>

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

export default AvancesAProyecto
