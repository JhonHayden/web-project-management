import React from 'react';
// componente de Input para formularios 
//                             props
const Input = ({ label, name, defaultValue, type, required, disabled=false }) => {
  return (
    <label htmlFor={name} className='flex flex-col my-3'>
      <span>{label}</span>
      <input
        required={required}
        type={type}
        name={name}
        className='input'
        defaultValue={defaultValue}
        disabled={disabled}
      />
    </label>
  );
};

export default Input;
