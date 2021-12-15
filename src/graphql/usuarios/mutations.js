import { gql } from '@apollo/client';

// estos templates son tal cual como se hacen en el explorer de ApolloStudio 
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
    $nombre: String
    $apellido: String
    $identificacion: String
    $correo: String
    $password:String
  ) {
    editarUsuario(
      _id: $_id
      nombre: $nombre
      apellido: $apellido
      identificacion: $identificacion
      correo: $correo
      password: $password

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

const EDITAR_ESTADO_USUARIO = gql`


mutation EditarEstadoUsuario($_id: String!, $estado: Enum_EstadoUsuario!) {
  editarEstadoUsuario(_id: $_id, estado: $estado) {
    _id
  }
}
`;


export { EDITAR_USUARIO, EDITAR_ESTADO_USUARIO };
