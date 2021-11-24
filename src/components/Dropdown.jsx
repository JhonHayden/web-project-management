import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';


// options es un objeto con clave y valor .. le paso un enumerador
const DropDown = ({ label, name, defaultValue = '', required, options }) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const optionsSelect = [['', 'Seleccione una opción', true], ...Object.entries(options)];
  console.log ('soy optionsSelect : ',optionsSelect);

  // optionsSelecte contiene lo siguiente si en options le pasamos el objeto Enum_EstadoUsuario

  // soy optionsSelect :Array(4)  
  //                         [ 0                       1               2
  //                  0: (3) ['',           'Seleccione una opción', true]
  //                  1: (2) ['PENDIENTE',      'Pendiente']
  //                  2: (2) ['AUTORIZADO',     'Autorizado']
  //                  3: (2) ['NO_AUTORIZADO',  'No autorizado'] 
  //                         ]length: 4



  useEffect(() => {
    setSelectedValue(defaultValue);
  }, [defaultValue]);

  return (
    <label htmlFor={name} className='flex flex-col my-3'>
      <span>{label}</span>
      <select
        required={required}
        name={name}
        className='input'
        value={selectedValue}
        onChange={(e) => setSelectedValue(e.target.value)}
      >
        {optionsSelect.map((o) => {
          return (
            <option key={nanoid()} value={o[0]} disabled={o[2] ?? false}>
              {o[1]}
            </option>
          );
        })}
      </select>
    </label>
  );
};

export default DropDown;
