import { gql } from '@apollo/client';

const CREAR_AVANCE = gql`

mutation CrearAvance($fecha: Date!, $descripcion: String!, $proyecto: String!) {
  crearAvance(fecha: $fecha, descripcion: $descripcion, proyecto: $proyecto) {
    _id
  }
}
`;



const EDITAR_AVANCE = gql`

mutation EditarAvance($_id: String!, $fecha: Date, $descripcion: String) {
  editarAvance(_id: $_id, fecha: $fecha, descripcion: $descripcion) {
   _id
  }
}
`;

const CREAR_OBSERVACION = gql`


mutation CrearObservacion($idAvance: String!, $descripcionObservacion: String!) {
  crearObservacion(idAvance: $idAvance, descripcionObservacion: $descripcionObservacion) {
  _id  
  }
}
`;

const EDITAR_OBSERVACION = gql`
mutation EditarObservacion(
  $idAvance: String!
  $indexObservacion: Int!
  $descripcionObservacion: String!
) {
  editarObservacion(
    idAvance: $idAvance
    indexObservacion: $indexObservacion
    descripcionObservacion: $descripcionObservacion
  ) {
    _id
  }
}

`;


export { CREAR_AVANCE, EDITAR_AVANCE, CREAR_OBSERVACION, EDITAR_OBSERVACION };