
// creamos los enumeradores como objetos donde las claves de estos objetos 
// enumeradores son iguales a como estan definidos en la base de datos en mayusculas 
// tal cual como estan tambien definidos en los tipos enumeradores de graphql del backend y el valor de cada
// clave es como queremos que se muestre en el frontend es el texto que se muestra en los dropdown es decir 
// las opciones de esos dropDown


// son objetos 
const Enum_Rol = {
  ADMINISTRADOR: 'Administrador',
  ESTUDIANTE: 'Estudiante',
  LIDER: 'Líder',
};

const Enum_EstadoUsuario = {
  PENDIENTE: 'Pendiente',
  AUTORIZADO: 'Autorizado',
  NO_AUTORIZADO: 'No autorizado',
};

const Enum_EstadoProyecto = {
  ACTIVO: 'Activo',
  INACTIVO: 'Inactivo',
};


const Enum_TipoObjetivo = {
  GENERAL: 'General',
  ESPECIFICO: 'Especifico',
}




export { Enum_Rol, Enum_EstadoUsuario, Enum_EstadoProyecto, Enum_TipoObjetivo };
