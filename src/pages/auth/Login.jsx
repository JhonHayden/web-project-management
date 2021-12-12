import React, { useEffect } from 'react';
import Input from 'components/Input';
import ButtonLoading from 'components/ButtonLoading';
import { Link } from 'react-router-dom';
import useFormData from 'hooks/useFormData';
import { useMutation } from '@apollo/client';
import { LOGIN } from 'graphql/auth/mutations';
import { useAuth } from 'context/authContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const Login = () => {
    const navigate = useNavigate();// me permite navegar a otra pagina de la aplicacion

    const { setToken } = useAuth();// permite traer y poder usar la funcion de guardar el token tanto en el estado como en el local 
    // storage pero como string gracias al JSON.stringify() que tiene dentro esta funcion de setToken

    const { form, formData, updateFormData } = useFormData();// hook para capturar 
    //   la informacion del formulario del login 

    const [login, { data: dataMutation, loading: mutationLoading, error: mutationError }] =
        useMutation(LOGIN);// mutacion del login retorna un array donde el primer elemento es la funcion 
    // que ejecuta la mutacion cuando se es llamada el segundo elemento es un objeto con tres atributos 
    // el primero es la data y esta es la repuesta enviada desde el backend luego de ejecutar la mutacion 
    // en esta vendria el token o el error segun sea el caso al hacer el login, luego el segundo atributo es un 
    // Boolean que me permite implementar un loading para animaciones en el front de espera a que se ejecute la 
    //  mutacion, el tercer atributo es el error de la mutacion 
    // el hook useMutation recibe como parametro el template de graphql de la mutacion a ejecutar (LOGIN)

    const submitForm = (e) => {// funcion que se ejecuta despues del evento oprimir el boton de inicio de sesion 
        e.preventDefault();

        login({ // mutacion de login se ejecuta justo cuando se ejecute el evento submit primero y esta envia las 
            // variables del formularion registrado en el login el correo y la contraseña del usuario 
            variables: formData,// formData tiene toda la informacion registrada en lso inputs del formulario
            //   se debe asegurar que los name de los inpust sea iguales a los inpust de la mutacion 
        });
    };

    useEffect(() => {
        if (dataMutation) {
            if (dataMutation.login.token) {
                setToken(dataMutation.login.token);// llamado de la funcion de guardar el token tanto en el estado como en el local 
                // storage pero como string gracias al JSON.stringify() que tiene dentro esta funcion de setToken
                navigate('/');// me redirije al home cuando ya inicie sesion el en login 
            } else if (dataMutation.login.error === 'Contraseña incorrecta') {

                toast.error('Contraseña incorrecta')

            } else {
                toast.error('No estas autorizado todavía')

            }
        }
    }, [dataMutation, setToken, navigate]);

    return (
        // <div className='flex flex-col items-center justify-center w-full h-full p-10'>
        <div className='flex justify-center'>

            <div className='flex flex-col items-center justify-center border border-gray-900 mt-20 p-10  bg-blue-400 rounded-md '>
                <h1 className='text-xl font-bold text-gray-900'>Iniciar sesión</h1>
                <form className='flex flex-col mx-10 font-bold' onSubmit={submitForm} onChange={updateFormData} ref={form}>
                    <Input name='correo' type='email' label='Correo' required={true} />
                    <Input name='password' type='password' label='Contraseña' required={true} />
                    <ButtonLoading
                        disabled={Object.keys(formData).length === 0}
                        loading={mutationLoading} /**le paso el mutationLoading para que muestre la animacion de carga */
                        text='Iniciar Sesión'
                    />
                </form>
                <span className='font-bold'>¿No tienes una cuenta?</span>{/**me permite dirigirme a la pagina de registro  */}
                <Link to='/auth/register'>
                    <span className='text-blue-700 font-bold'>Regístrate</span>
                </Link>
            </div>
        </div>
    );
};

export default Login;

