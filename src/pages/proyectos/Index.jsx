import React, { useEffect, useState } from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { styled } from '@mui/material/styles';
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





const AccordionStyled = styled((props) => (<Accordion {...props} />))(({ theme }) => ({
    background: 'gray',



}));
const AccordionSummaryStyled = styled((props) => (<AccordionSummary {...props} />))(({ theme }) => ({
    background: '#919191', // modifica los stilos del acordeon  



}));
const AccordionDetailsStyled = styled((props) => (<AccordionDetails {...props} />))(({ theme }) => ({
    background: '#ccc'


}));




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
                <div className='self-end'>
                    <button className='self-end bg-gray-500 text-gray-50 rounded-3xl p-2 shadow-2xl hover:bg-gray-600 mt-1 '>
                        <Link to='/proyectos/nuevoProyecto'>
                            crear nuevo proyecto
                        </Link>
                    </button>
                </div>

                {queryData.Proyectos.map((proyecto) => { // recorro la data para mostrarla

                    return (

                        <AccordionProyecto proyecto={proyecto} />
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
                            {proyecto.nombre} - {proyecto.estado}
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
                    <i className='fas fa-pen mx-4 text-blue-700 hover:text-blue-500'
                        onClick={() => {
                            setShowDialog(true);// cuando le damos click al lapiz me ejecuta el setEditMode
                        }}
                    />
                    <div>
                        Liderado por: {proyecto.lider.correo}
                    </div>
                    <div>
                        {proyecto.objetivos.map((objetivo) => {
                            return (

                                <Objetivo tipo={objetivo.tipo} descripcion={objetivo.descripcion} />
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

export default IndexProyectos
