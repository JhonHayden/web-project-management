import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import Input from 'components/Input';// componente input
import ButtonLoading from 'components/ButtonLoading';
import useFormData from 'hooks/useFormData';
import { CREAR_PROYECTO } from 'graphql/proyectos/mutations';
import { useMutation } from '@apollo/client';
import DropDown from 'components/Dropdown';
import { Enum_TipoObjetivo } from 'utils/enums';
import { nanoid } from 'nanoid';
import { ObjContext } from 'context/objContext';
import { useObj } from 'context/objContext';// hook para usar el contexto 
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';






const NuevoProyecto = () => {

    const navigate = useNavigate();
    const { form, formData, updateFormData } = useFormData(); // hook para capturar la informacion de 
    // los inputs  lo almacenaremos en estos estados cuando ocurra el evento submit 

    const [validacionObjetivosExistente, setValidacionObjetivosExistente] = useState(true)

    const [crearProyecto, { data: mutationData, loading: mutationLoading, error: mutationError }] =
        useMutation(CREAR_PROYECTO);


    useEffect(() => {// escucha la respuesta del backend a la mutacion y me imprime en consola esta respuesta 
        console.log('data mutation', mutationData);
    });


    useEffect(() => {

        if (formData.objetivos) {
            setValidacionObjetivosExistente(false)
        } else {
            setValidacionObjetivosExistente(true)
        }

    }, [formData.objetivos])


    useEffect(() => {
        if (mutationData) {
            toast.success('Proyecto creado con exito');
            // refetch(); // pendiente para agregar y que me muestre los avances 
            navigate("/proyectos")
        }
    }, [mutationData])

    useEffect(() => {
        if (mutationError) {
            toast.error('Error creando la observación');
        }
    }, [mutationError]);

    const submitForm = (e) => {
        e.preventDefault();



        formData.objetivos = Object.values(formData.objetivos);// me permite solo obtener los valores de los objetivos y escluir los 
        // id es decir me transforma la informacion de esto:
        // objetivos:

        //     1ox_msc1gZJ6JU0BnURzo: // id 
        //         descripcion: "3"
        //         tipo: "ESPECIFICO"
        //         [[Prototype]]: Object
        //     mIB8EUsMRTRIH8UfSAqS5: //id 
        //         descripcion: "1"
        //         tipo: "GENERAL"
        //         [[Prototype]]: Object
        //     qr8CF31euhT-vbGYd4a9j: //id
        //         descripcion: "2"
        //         tipo: "ESPECIFICO"

        // a este formato : me quita los id  acomoda la informacion con los values en array de objetivos 
        // objetivos: Array(3)
        //     0:
        //         descripcion: "1"
        //         tipo: "GENERAL"
        //         [[Prototype]]: Object
        //     1:
        //         descripcion: "2"
        //         tipo: "ESPECIFICO"
        //         [[Prototype]]: Object
        //     2:
        //         descripcion: "3"
        //         tipo: "ESPECIFICO"
        //         [[Prototype]]: Object


        formData.presupuesto = parseFloat(formData.presupuesto); // me permite convertir el string del presupuesto en float porque el 
        // backend espera un float no un string 
        console.log("datos enviados al api: ", formData)// mostramos en consola la data del formulario que sera enviado al backend por medio 
        // de la mutacion crearProyecto


        //ejecutamos la mutacion para crear proyecto 
        crearProyecto({ // le pasamos las variables 

            variables: {

                nombre: formData.nombre,
                fechaInicio: formData.fechaInicio,
                fechaFin: formData.fechaFin,
                presupuesto: formData.presupuesto,
                objetivos: formData.objetivos
            }
            // "objetivos": [
            //   {
            //     "descripcion": null,
            //     "tipo": null
            //   }
            // ]
        })

    }


    return (
        <div className='p-10 flex flex-col'>
            <div className=''>
                <Link to='/proyectos'>
                    <i className="fas fa-arrow-circle-left text-gray-800 " ></i>
                </Link>
            </div>
            <div className='self-center'>
                <h1 className='text-2xl font-bold text-gray-900'>Crear nuevo proyecto </h1>
            </div>



            <form ref={form} onChange={updateFormData} onSubmit={submitForm}>
                <Input name='nombre' label='Nombre del Proyecto' required={true} type='text' />
                <Input name='presupuesto' label='Presupuesto del Proyecto' required={true} type='number' />
                <Input name='fechaInicio' label='Fecha de Inicio' required={true} type='date' />
                <Input name='fechaFin' label='Fecha de Fin' required={true} type='date' />
                <Objetivos />
                <ButtonLoading text='Crear Proyecto' loading={false} disabled={validacionObjetivosExistente} /> {/**Boton para el submit del formulario 
         * de tipo submit esto hace que cuando se oprima se ejecute el evento onSubmit del formulario y este a
         * su vez ejecuta el la funcion submitForm que captura los datos del formulario 
        */}

            </form>
        </div>
    )
}


const Objetivos = () => {

    const [listaObjetivos, setListaObjetivos] = useState([]);// almacenare los objetivos 

    const eliminarObjetivo = (id) => {

        setListaObjetivos(listaObjetivos.filter((el) => el.props.id !== id)); // me guarda en el estado listaobjetivos todos 
        // los elementos que tenia o tiene menos el elemento o componente FormObjetivo cuyo id es igual al id generado por 
        // el nanoid, en otras palabras pone todos los elementos o componentes en el estado cuyo id en los props son 
        // diferentes al id ingresado como input a esta funcion de eliminar objetivo
    };

    const componenteObjetivoAgregadoaLista = () => {

        const id = nanoid();// nanoid es una libreria que genera id aleatorios y unicos 

        return (
            //            //   props    //
            <FormObjetivo key={id} id={id} />// key me permite que react identifique cual componente 
            // es por que cada componente FormObjetivo tendra un id y asi luego poder implementar la 
            // eliminacion por el boton de menos 
        )

    }


    return (
        <ObjContext.Provider value={{ eliminarObjetivo }}> {/**contexto para poder pasar la funcion de eliminar como 
         * prop (value={{ eliminarObjetivo }}) y asi todo lo que este dentro de este contexto ObjContext.Provider puede utilizar 
         * esta funcion  eliminarObjetivo
         */}
            <div>
                <div >
                    <div className='flex'>
                        <h1>
                            Objetivos del proyecto
                        </h1 >

                        <i className='fas fa-plus rounded-full bg-green-500 hover:bg-green-400 text-white p-2 mx-2 cursor-pointer'
                            onClick={() => {
                                setListaObjetivos([...listaObjetivos, componenteObjetivoAgregadoaLista()])
                            }
                            }// Cada ves que le de click en el icono de fas fa-plus
                        // se ejecuta la funcion setListaObjetivos y ella me guarda un array, una lista con  todo lo que 
                        // ya tiene guardado antes, esto es gracias al spread operator (...),  mas algo nuevo 
                        />
                    </div>

                    {listaObjetivos.map((objetivo) => { // me recorre la lista de objetivos y me muestra todo lo del  return cada vez
                        // recorre un elemento es decir cada elemento es un bloque de return que se renderiza y se muestra   
                        return (
                            objetivo
                        )
                    })}
                </div>

            </div>
        </ObjContext.Provider>

    )
}

const FormObjetivo = ({ id }) => {

    const { eliminarObjetivo } = useObj();// forma para permitir usar la funcion de eliminarObjetivo

    return (
        <div className='flex'>
            {/* <Input name='descripcion' label='Descripcion' required={true} type='text' // componente input  */}
            <Input
                name={`nested||objetivos||${id}||descripcion`}// el name debe ser en este formato para trabajar el userFormData
                // despues del nested sigue el campo con el nombre igual en la base de datos de array embebido  en este caso es objetivos 
                // y luego el id y seguido el campo igual que en la base de datos tiene cada objetivo como uno de sus dos atributos la descripcion 

                label='Descripcion'
                required={true}
                type='text' // componente input 
            />
            {/* <label htmlFor="descripcion" className='flex flex-col my-3'>
                <span>"Descripcion"</span>
                <input
                    required={true}
                    type="textarea"
                    name="descripcion"
                    className='input'
                /> */}
            {/* <label htmlFor="descripcion" className='flex flex-col my-3'>

                <textarea  name="descripcion" rows="4" cols="50"> </textarea>

            </label> */}
            {/* <DropDown options={Enum_TipoObjetivo} label='Tipo de objetivo' required={true} /> */}
            <DropDown
                name={`nested||objetivos||${id}||tipo`}// el name debe ser en este formato para trabajar el userFormData
                // despues del nested sigue el campo con el nombre igual en la base de datos de array embebido  en este caso es objetivos 
                // y luego el id y seguido el campo igual que en la base de datos tiene cada objetivo como uno de sus dos atributos el tipo 

                options={Enum_TipoObjetivo}
                label='Tipo de objetivo'
                required={true} />



            <i
                onClick={() => eliminarObjetivo(id)}//cuando le den click en el botton de menos de cada objetivo se 
                // ejecuta la funcion de eliminarObjetivo
                className='fas fa-minus rounded-full bg-red-500 hover:bg-red-400 text-white p-2 my-8 cursor-pointer mx-8' />

        </div>
        //     <div className='flex items-center'>
        //     <Input
        //       name={`nested||objetivos||${id}||descripcion`}
        //       label='Descripción'
        //       type='text'
        //       required={true}
        //     />
        //     <DropDown
        //       name={`nested||objetivos||${id}||tipo`}
        //       options={Enum_TipoObjetivo}
        //       label='Tipo de Objetivo'
        //       required={true}
        //     />
        //     <i
        //       onClick={() => eliminarObjetivo(id)}
        //       className='fas fa-minus rounded-full bg-red-500 hover:bg-red-400 text-white p-2 mx-2 cursor-pointer mt-6'
        //     />
        //   </div>
    )
}
export default NuevoProyecto
