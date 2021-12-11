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

export { CREAR_AVANCE, EDITAR_AVANCE };