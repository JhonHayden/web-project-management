import { gql } from '@apollo/client';// funcion para generar los template de consulta de graphql
// plantillas de consulta de graphql es la misma funcion que se usa en el servidor solo que 
// se inmporta de modulos diferentes esta es en apolloCLient 

// templates de consultas Usuarios, o String de graphql para las consultas de la coleccion usuarios
// en este archivo estan todas las consultas para la coleccion de usuarios 
// es decir las funciones de lectura de datos de la colecion usuarios de la base de datos 

// esos template son literalmente inguales a los templates ya hechos para las consultas desde el 
// explorador de apolloStudio y aqui van dentro de la funcion gql`aqui va el query`

// consulta de todos los usuarios 
const GET_USUARIOS = gql`
  query Usuarios {
    Usuarios {
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


// consulta de un usuario 
const GET_USUARIO = gql`
  query Usuario($_id: String!) {
    Usuario(_id: $_id) {
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

export { GET_USUARIOS, GET_USUARIO };
