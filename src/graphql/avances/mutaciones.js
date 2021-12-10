import { gql } from '@apollo/client';

const CREAR_AVANCE = gql`

mutation CrearAvance($fecha: Date!, $descripcion: String!, $proyecto: String!) {
  crearAvance(fecha: $fecha, descripcion: $descripcion, proyecto: $proyecto) {
    _id
  }
}
`;

export {CREAR_AVANCE};