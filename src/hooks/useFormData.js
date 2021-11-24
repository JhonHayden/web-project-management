import { useRef, useState } from 'react';


// hook personalizado de useFormData

const useFormData = (initial) => {

  const form = useRef(initial);// me permite referenciar y apuntar al formulario que le asigne a la propuiedad
  // ref este form  es decir ref={form} y asi teniendo esta referencia puedo despues capturar toda la informacion 
  // actual (current) que se esta o se ha registrado en todos los inputs de este formulario con referencia ref={form}
  // es decir para como argumento el form.current al constructor de una instacia de  y el me construye un objeto 
  // con toda la informacion del formulario (fd) para luego recorrer esta data y guardarla en un objeto con 
  // clave (key) = representa el la propieda name de cada input y el value su valor registrado en el input 

  const [formData, setFormData] = useState({});// declaro la varible de tipo objeto que tendra todas las informaciones
  // del formulario referenciado con el useRef (form) pero ya organizada con la funcion o metodo getFormData

  const getFormData = () => {
    const fd = new FormData(form.current);
    const obj = {};// declaro un objeto vacio donde luego guardo la informacion organizada como clave=valor que  
    // tiene dentro el objeto  fd (formData) 
    fd.forEach((value, key) => {
      obj[key] = value;
    });
    return obj;
  };

  const updateFormData = () => { // esta funcion o metodo sera llamada cada ves que el formulario cambie sus datos 
    // registrados en los inputs con el evento onchange del formulario me ejecuta esta funcion y esta me guarda 
    // la infomacion capturada y organizada con la funcion getFormData()
    setFormData(getFormData());// me actualiza el formData
  };
  
  return { form, formData, updateFormData };
};

export default useFormData;
