import React, { useEffect } from 'react';
import Input from 'components/Input';
import DropDown from 'components/Dropdown';
import ButtonLoading from 'components/ButtonLoading';
import useFormData from 'hooks/useFormData';
import { Link } from 'react-router-dom';
import { REGISTRO } from 'graphql/auth/mutations';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router';// hook paara redireccionar al home o a cualquier pagina deacuerdo a la ruta
// que le demos 
import { Enum_Rol } from 'utils/enums';
import { useAuth } from 'context/authContext';// importo el contexto de autenticacion 


// Pagina de registro 

const Register = () => {

  const { setToken } = useAuth();// permite traer y poder usar la funcion de guardar el token tanto en el estado como en el local 
  // storage pero como string gracias al JSON.stringify() que tiene dentro esta funcion de setToken

  const navigate = useNavigate();// uso del hook para redireccionar a otra pagina en este caso 
  // lo usaremos para direcionar al home cuando el usuario ya se registro y existe token 
  const { form, formData, updateFormData } = useFormData();// uso el hook personalizado para capturar
  // informacion de los formularios y ademas actualizarlos es decir solo si existe un cambio en alguno de los 
  // input del formulario se ejecuta updateFormData el cual me pone estos cambios nuevos en la variable formData el 
  // cual es un objeto con todos los datos del formulario solo si hubo cambios 

  const [registro, { data: dataMutation, loading: loadingMutation, error: errorMutation }] =
    useMutation(REGISTRO);//defino la mutacion registro 

  const submitForm = (e) => {
    // dentro de es funcion se implementa la mutacion dado que necesito que se registre un usuario cuando 
    // le oprima el boton de submit
    // console.log('form data', formData);// formData es la informacion capturada de los inputs del 
    // formulario despues de hacer el evento onSubmit
    e.preventDefault();// pendiente!!! 
    console.log('enviar datos al backend', formData);
    registro({ variables: formData });// ejecuto la mutacion y le paso todos lo datos del formulario 
  };

  useEffect(() => {// si dataMutation cambia ejecuto lo siguiente y asi puedo guardar el token que 
    // trae dataMutation luego de ejecutarse la mutacion de registro . en un principio dataMutation no tiene ningun 
    // valor pero luego de ejecutarse la mutacion de registro esta tiene el response del backend el cual es el token 
    // y con el useEffect puedo ver este cambio y asi ejecutar lo siguiente y es guardar el token y luego direccionar a el home 
    // console.log('data mutation', dataMutation); //  data mutation es la respuesta a la mutacion (contiene 
    //  el token  de autenticacion) 
    if (dataMutation) {// si dataMutation tiene contenido se ejecuta  lo siguiente esto es para verificar si es null y no me
      // salte error en la siguiente if .. dado que en un principio dataMutation es null entonces el siguiente if 
      // fallaria si no esta el primer if  
      if (dataMutation.registro.token) {// si tiene el token sigue lo siguiente 

        setToken(dataMutation.registro.token);// llamado de la funcion de guardar el token tanto en el estado como en el local 
        // storage pero como string gracias al JSON.stringify() que tiene dentro esta funcion de setToken

        // localStorage.setItem('token', dataMutation.registro.token);// otra forma que me permite guardar el token en el local 
        // storage el primer parametro es la clave y el segundo es el token el value .. 
        navigate('/');  // me permite que cuando recibe el token es decir exista token dentro de la datamutation 
        // que retorna la mutacion cuando termina de hacer su trabajo en esta data esta dentro el token si 
        // hay token  navigate me direcciona al home ('/')
      }
    }
  }, [dataMutation]);

  return (
    <div className='flex flex-col h-full w-full items-center justify-center'>
      <h1 className='text-3xl font-bold my-4'>Regístrate</h1>
      <form className='flex flex-col' onSubmit={submitForm} onChange={updateFormData} ref={form}>
        <div className='grid grid-cols-2 gap-5'>
          <Input label='Nombre:' name='nombre' type='text' required />
          <Input label='Apellido:' name='apellido' type='text' required />
          <Input label='Documento:' name='identificacion' type='text' required />
          <DropDown label='Rol deseado:' name='rol' required={true} options={Enum_Rol} />
          <Input label='Correo:' name='correo' type='email' required />
          <Input label='Contraseña:' name='password' type='password' required />
        </div>
        <ButtonLoading
          disabled={Object.keys(formData).length === 0}
          loading={false}
          text='Registrarme'
        />
      </form>
      <span>¿Ya tienes una cuenta?</span>
      <Link to='/auth/login'> {/**me permite dirigirme al inicio de sesion, pagina login */}
        <span className='text-blue-700'>Inicia sesión</span>
      </Link>
    </div>
  );
};

export default Register;

