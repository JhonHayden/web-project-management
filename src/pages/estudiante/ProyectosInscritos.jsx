import React, { useEffect, useState } from 'react';
import { GET_INSCRIPCIONES } from 'graphql/inscripciones/queries';
import { useMutation, useQuery } from '@apollo/client';
import PrivateRoute from 'components/PrivateRoute';
import ButtonLoading from 'components/ButtonLoading';
import { nanoid } from 'nanoid';
import { Link } from 'react-router-dom';// me permite hacer enlaces y navegar  a otras paginas 
import { Dialog } from '@mui/material';
import useFormData from 'hooks/useFormData';
import { CREAR_AVANCE } from 'graphql/avances/mutaciones'
import Input from 'components/Input';// componente input
import { toast } from 'react-toastify';



import {
    AccordionStyled,
    AccordionSummaryStyled,
    AccordionDetailsStyled,
} from 'components/Accordion';




const ProyectosInscritos = () => {

    const { data, loading, error } = useQuery(GET_INSCRIPCIONES); // consulta y query a las inscripciones 

    // const [ningunaInscripcion, setNingunaInscripcion] = useState(false)
    useEffect(() => {
        // console.log("Data: ", data)
    }, [data])



    if (loading) return <div>Cargando...</div>;//




    if (data.Inscripciones) {



        if (data.Inscripciones.filter((el) => el.estado === 'ACEPTADA')) {

            const misProyectosInscrito = data.Inscripciones.filter((el) => el.estado === 'ACEPTADA')
            // console.log(misProyectosInscrito.length==0 )
            // if (misProyectosInscrito.length == 0) {

            //     setNingunaInscripcion(true)
            // }

            // console.log("misProyectosInscrito:", misProyectosInscrito)
            console.log(data.Inscripciones.filter((el) => el.estado === 'ACEPTADA'))


            return (

                <div>

                    <PrivateRoute roleList={['ESTUDIANTE']}> {/**me permite privar en acceso a esta pagina para 
                 * roles distintos a los de roleList */}
                        <div >
                            <div className='flex justify-center'>

                                <h1 className='text-4xl font-extrabold '>Mis proyectos</h1>
                            </div>
                            
                            {misProyectosInscrito &&
                                misProyectosInscrito.map((proyectoInscrito) => {
                                    return (
                                        <div>

                                            <AccordionProyecto proyecto={proyectoInscrito.proyecto} />


                                        </div>

                                    )
                                })}

                        </div>

                    </PrivateRoute >


                </div>

            )


        }

    } else {

        return (
            <div>
                no hay inscripciones aceptadas
            </div>
        )
    }
}


const AccordionProyecto = ({ proyecto }) => {// recibe como prop o input cada proyecto 

    const [showDialog, setShowDialog] = useState(false);// estado para permitir mostrar un dialog


    return (
        <div className='p-10 '>

            <AccordionStyled>

                <AccordionSummaryStyled className='bg-red-500  ' expandIcon={<i className='fas fa-chevron-down' />}>
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
                        <Link to={`/proyectosinscritos/avances/${proyecto._id}`}>
                            <span className='uppercase font-bold text-gray-100 mr-2 '>Avances </span>
                            {/* <span className='uppercase font-bold text-gray-100  '>Avances ({proyecto.avances.length})</span> */}
                        </Link>
                    </div>
                </AccordionSummaryStyled>
                <AccordionDetailsStyled>
                    <div>
                        {proyecto.objetivos.map((objetivo) => {
                            return (

                                <Objetivo key={nanoid()} tipo={objetivo.tipo} descripcion={objetivo.descripcion} />
                            )
                        })}
                    </div>

                    <ButtonLoading
                        text='Crear Avance'
                        loading={false}
                        disabled={proyecto.estado === "ACTIVO" ? false : true}
                        onClick={() => {
                            setShowDialog(true);// cuando le damos click al lapiz me ejecuta el setEditMode y puedo editar el estado de un 
                            // proyecto 
                        }}
                    />


                </AccordionDetailsStyled>

            </AccordionStyled>

            <Dialog
                open={showDialog}
                onClose={() => {
                    setShowDialog(false);
                }}>
                <FormularioAvance
                    proyecto={proyecto._id}
                    nombreProyecto={proyecto.nombre}
                    setShowDialog={setShowDialog} />
            </Dialog>


        </div>
    )
}


const FormularioAvance = ({ proyecto, nombreProyecto, setShowDialog }) => {

    const { form, formData, updateFormData } = useFormData();
    const [crearAvance, { data, loading, error }] = useMutation(CREAR_AVANCE);

    // console.log("proyecto", proyecto)

    useEffect(() => {
        if (data) {
            toast.success('Avance creado con exito');
            //   refetch(); // pendiente para agregar y que me muestre los avances 
            setShowDialog(false)
        }
    }, [data]);

    useEffect(() => {
        if (error) {
            toast.error('Error creando el avance');
        }
    }, [error]);


    const submitForm = (e) => {
        e.preventDefault();

        // console.log("formData de avance", formData)

        crearAvance({
            variables: {
                proyecto,
                fecha: formData.fecha,
                descripcion: formData.descripcion,
            },
        });
    };


    return (

        <div className='p-4 '>
            <h1 className='font-bold'>
                Fomulario Avance
            </h1>
            <div className='font-extrabold'>
                Proyecto: {nombreProyecto}
            </div>

            <form
                ref={form}
                onChange={updateFormData}
                onSubmit={submitForm}
                action=""
                className='flex flex-col items-center'>

                <Input name='fecha' label='Fecha' required={true} type='date' />
                <label htmlFor='descripcion' className='flex flex-col my-3'>
                    <span>Descripción Avance</span>
                    <textarea className='border' name="descripcion" id="" cols="50" rows="10" required></textarea>
                </label>
                <ButtonLoading disabled={false} loading={false} text='Confirmar' />

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



export default ProyectosInscritos
