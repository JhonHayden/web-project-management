import { gql } from '@apollo/client';

// estos templates son tal cual como se hacen en el explorer de ApolloStudio 
// Mutacion:    mutation nombreMutacionqueyoquiera(
//                  declaracionVariable input: con su tipo de dato,
//                  declaracionVariable input: con su tipo de dato, 
//                  declaracionVariable input: con su tipo de dato, 
//                )
//              {
//                  nombre de mutacion definida como esta el backend tal cual(
//                 input : variable,
//                 input : variable,
//                 input : variable,
//                 ){
//                      campos que quiero que me retorne el backend de graphQL despues de 
//                       ejecutar la mutacion

//                        token
//                        error
//                   }
//                 }


const REGISTRO = gql`


  mutation Registro(
      
      $identificacion: String!,
      $nombre: String!,
      $apellido: String!,
      $correo: String!,
      $rol: Enum_RolUsuario!,
      $password: String!
      ) {

    registro(
          identificacion: $identificacion,
          nombre: $nombre, 
          apellido: $apellido, 
          correo: $correo, 
          rol: $rol, 
          password: $password
          ){
            token
            error
          }
      }`;

const LOGIN = gql`

  mutation Login($correo: String!, $password: String!) {

    login(correo: $correo, password: $password)
     {
      token
      error
    }
  }
`;

export {REGISTRO,LOGIN};