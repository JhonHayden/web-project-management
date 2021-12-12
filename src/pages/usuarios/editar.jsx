import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';// permite hacer las conexiones de consultas o mutaciones a la
//                                                       base de datos a traves de los hook  useQuery, useMutation
import { GET_USUARIO } from 'graphql/usuarios/queries';
import Input from 'components/Input';// importamos el componente input para los formularios 
import ButtonLoading from 'components/ButtonLoading';
import useFormData from 'hooks/useFormData';
import { toast } from 'react-toastify';
import DropDown from 'components/Dropdown';
import { Enum_EstadoUsuario } from 'utils/enums';
import { EDITAR_ESTADO_USUARIO } from 'graphql/usuarios/mutations';

const EditarUsuario = () => {
  const { form, formData, updateFormData } = useFormData(null);// uso el hook personalizado para capturar
  // informacion de los formularios y ademas actualizarlos es decir solo si existe un cambio en alguno de los 
  // input del formulario se ejecuta updateFormData el cual me pone estos cambios nuevos en la variable formData el 
  // cual es un objeto con todos los datos del formulario solo si hubo cambios 

  const { _id } = useParams();// funcionde react-router-dom que permite capturar el numero escrito al 
  // final de la ruta de EditarUsuario
  // <Route path='/usuarios/editar/:_id' element={<EditarUsuario />} me captura el  valor escrito despues de los dos 
  // puntos este valor esta almacenado en la varible _id es decir si se escribe la url 
  // http://localhost:3000/usuarios/editar/(aqui un _id de un usuario real guardado en la base de datos)  useParams lo 
  // captura y lo almacena en la variable {_id}

  const {
    // El hook useQuery recibe como parametro el template o plantilla o string de consultade graphql GET_USUARIO
    //se le puede cambiar el nombre a las variables que retorna el hook useQuery de esta forma:
    //  data: queryData, loading: queryLoading, error: queryError 


    // cada ves que se actualize la pagina  EditarUsuario el cual es el formulario de editar un usuario se ejecuta
    //  el hook de useQuery(GET_USUARIO el cual trae todos lo datos de un usuario por el _id que le enviamos y luego lo pinto en el 
    // formulario   
    // esto sucede la primera ves, trae los dtaos desde el backend y lo deja en la cache y luego las demas veces solo consulta la informacion desde 
    // la cache y hace que la navegacion sea rapida la carga de los datos .. 


    data: queryData,// datos de un usuario consultado a traves de _id con el hook useQuery 
    error: queryError,
    loading: queryLoading,
  } = useQuery(GET_USUARIO, {// este query requiere un input 
    variables: { _id },// esta es la forma de enviarle el input. le enviamos el input establecido en el 
    // resolver del servidor para este query en el metodo findOneAndUpdate({ _id:args._id } y es el _id solo el 
    // _id = tiene almacenado en valor capturado escrito en la url despues de los dos puntos con el useParams y es 
    // el _id original de un usuario almacenado en la bases de datos

    // useQuery me entrega tres estados y tambien guardan en cache la informacion asi cuando se consulta de nuevo sin actualizar 
    // la pagina traen la informacion no de la base de datos si no desde el cache y asi la navegacion se hace mucho mas 
    // rapido 
  });

  console.log(queryData);

  const [editarEstadoUsuario, { data: mutationData, loading: mutationLoading, error: mutationError }] =
    useMutation(EDITAR_ESTADO_USUARIO); // declarion del hook que me permite usar las mutaciones 
  // este hook me entrega la funcion de la mutacion una funcion con el nombre que yo desee que reprensenta
  // la funcion de mutacion que quiero ejecutar y me entrega un objeto con los atributos de data el cual 
  // es la data que retorna el servidor depues de ejecutar la funcion de mutacion editarEstadoUsuario, un loading
  // de tipo boolean el cual reprensenta el tiempo de carga de desde la ejecucion de la mutacion hasta la respuesta
  // y el error el cual es una propiedad o variable que trae el error si la mutacion no se pudo ejecutar por 
  // alguna razon 




  //se le puede cambiar el nombre a las variables que retorna el hook useMutation de esta forma:
  //  data: mutationData, loading: mutationLoading, error: mutationError 

  // console.log('form data', formData)



  const submitForm = (e) => {
    e.preventDefault(); // me permite hacer validaciones de campos vacios 
    // console.log('form data', formData);// formData es la informacion capturada de los inputs del 
    // formulario despues de hacer el evento onSubmit

    delete formData.rol;

    // console.log('form data', formData)
    editarEstadoUsuario({// ejecuta la mutacion y le pasa las variables a modificar el _id es el usuario a editar 
      // y el formData que tiene los campos editados que se registraron en cada input del formulario 
      variables: { _id, ...formData }, // ... significa ponga todo lo mismo que esta en formData el cual tiene
      //   todos los datos de los inputs del formulario, y es un objeto de clave y valor donde la clave es 
      //   el name de cada input y el valor el value de cada input relacionado con el name correspodiente evidentemente 
      //   esto name debes ser definidos iguales a como se tiene en los types y esquemas en el backend 

      // editarUsuario tambien retorna un mutationData 
    });
  };

  useEffect(() => {
    if (mutationData) {
      toast.success('Usuario modificado correctamente');
    }
  }, [mutationData]);

  useEffect(() => {
    if (mutationError) {
      toast.error('Error modificando el usuario');
    }

    if (queryError) {
      toast.error('Error consultando el usuario');
    }
  }, [queryError, mutationError]);

  if (queryLoading) return <div>Cargando....</div>;//sale un loading mietras se termina la ejecucion del query. solo muestrq esto en la
  // pagina mientras es true el queryloading no pasa al otro return que muestra y renderiza el formulario hasta que 
  // queryLoading sea = false

  return (
    <div className='flew flex-col w-full h-full items-center justify-center p-10'>
      <Link to='/usuarios'> {/**me retorna a la tabla de los usuarios */}
        <i className='fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900' />
      </Link>
      <h1 className='m-4 text-3xl text-gray-800 font-bold text-center'>Editar Usuario</h1>
      <form
        onSubmit={submitForm} // cuando se ejecuta el evento onSubmit es decir se oprime el boton 
        // del formulario que es de tipo submit se ejecuta la funcion submitForm
        // onSubmit es un evento de las etiquetas form (fomularios) 
        onChange={updateFormData}// cada que exista un cambio en los datos del formulario
        // cuando se ejecuta el evento submit es decir se oprime el boton y los datos del formulario 
        // los cambiaron se activa el evento onchage y se ejecuta la funcion de updateFormData que me 
        // actualiza el formData
        ref={form}// me permite referenciar este formulario para capturar toda la informacion registrada en los inputs 
        // despes de ejecutar el evento onSubmit es decir oprimir el boton 
        className='flex flex-col items-center justify-center'
      >
        <Input
          label='Nombre de la persona:'
          type='text'
          name='nombre'
          defaultValue={queryData.Usuario.nombre}
          required={true}
          disabled={true}
        />
        <Input
          label='Apellido de la persona:'
          type='text'
          name='apellido'
          defaultValue={queryData.Usuario.apellido}
          required={true}
          disabled={true}

        />
        <Input
          label='Correo de la persona:'
          type='email'
          name='correo'
          defaultValue={queryData.Usuario.correo}
          required={true}
          disabled={true}

        />
        <Input
          label='Identificación de la persona:'
          type='text'
          name='identificacion'
          defaultValue={queryData.Usuario.identificacion}
          required={true}
          disabled={true}

        />
        <DropDown
          label='Estado de la persona:'
          name='estado'
          defaultValue={queryData.Usuario.estado}
          required={true}
          options={Enum_EstadoUsuario}// le paso el enumerador de las 
        // opciones de los estados del usuario: 
        //   PENDIENTE: 'Pendiente',
        //   AUTORIZADO: 'Autorizado',
        //   NO_AUTORIZADO: 'No autorizado',
        />
        <span>Rol del usuario: {queryData.Usuario.rol}</span>
        <ButtonLoading
          disabled={Object.keys(formData).length === 0}//**me permite desahabilitar el submit cuando no modifico 
          //       ningun campo del formulario y le doy en comfirmar eso daria un error, sin esta linea de codigo en el disabled puesto que 
          //     me esta obteniendo las keys claves (como un objeto de claves me lo guarda, esto lo hace Object) del objeto formData con los campos
          //      e inputs del formulario, si no modificaron ningun campo o input no hay claves ni  valores en el objeto puesto que formData solo 
          //     almacena valores cuando han sido modificado algun de los inputs del formulario enotnces el tamaño(length) de este objeto 
          //   de keys es cero cuando no han modificado nada y con el === 0 me true el resultado asi evitando hacer la mutacion y evitar enviar 
          // la mutacion sin ningun dato a modificar y asi se corrige el error 
          loading={mutationLoading}// le paso como parametro entrada o prop al componente boton el loading 
          // renombrado como mutationLoading  (loading: mutationLoading)--> forma de cambiarle en nombre a loading por
          // otro mutationLoading
          text='Confirmar'
        />
      </form>
    </div>
  );
};

export default EditarUsuario;
