import { gql } from '@apollo/client';


// Mutacion:    mutation nombreMutacionqueyoquiera(declaracionVariables input: con su tipo )
//              {
//                  nombre de mutacion definida como esta el backend tal cual(
//                 inputs : variables
//                 ){
//                      campos que quiero que me retorne el backend de graphQL despues de 
//                       ejecutar la mutacion
//                   }
//                 }

const EDITAR_USUARIO = gql`
  mutation EditarUsuario(
    $_id: String!
    $nombre: String!
    $apellido: String!
    $identificacion: String!
    $correo: String!
    $estado: Enum_EstadoUsuario!
  ) {
    editarUsuario(
      _id: $_id
      nombre: $nombre
      apellido: $apellido
      identificacion: $identificacion
      correo: $correo
      estado: $estado
    ) {
      _id
      nombre
      apellido
      correo
      estado
      identificacion
      rol
    }
  }
`;

export { EDITAR_USUARIO };
