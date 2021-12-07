import { gql } from '@apollo/client';

const EDITAR_PROYECTO = gql`
  mutation Mutation($_id: String!, $estado: Enum_EstadoProyecto) {
    editarProyecto(_id: $_id, estado: $estado) {
      _id
      estado
    }
  }
`;

const CREAR_PROYECTO = gql`
  mutation CrearProyecto(
    $nombre: String!
    $presupuesto: Float!
    $fechaInicio: Date!
    $fechaFin: Date!
    $lider: String!
    $objetivos: [crearObjetivo]
  ) {
    crearProyecto(
      nombre: $nombre
      presupuesto: $presupuesto
      fechaInicio: $fechaInicio
      fechaFin: $fechaFin
      lider: $lider
      objetivos: $objetivos
    ) {
      _id
    }
  }
`;

export { EDITAR_PROYECTO, CREAR_PROYECTO };


// mutation EditarProyecto($id: String!, $fase: Enum_FaseProyecto) {
//   editarProyecto(_id: $id, fase: $fase) {
//     estado
//     fase
//     fechaFin
//     fechaInicio
    
//   }
// }