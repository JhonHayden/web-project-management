import { gql } from '@apollo/client';

const EDITAR_PROYECTO = gql`
  mutation Mutation($_id: String!, $estado: Enum_EstadoProyecto, $fase: Enum_FaseProyecto ) {
    editarProyecto(_id: $_id, estado: $estado, fase:$fase) {
      _id
      estado
      fase
    }
  }
`;
const EDITAR_PROYECTO_ROL_LIDER = gql`
  mutation EditarProyecto($_id: String!, $nombre: String, $presupuesto: Float) {
  editarProyecto(_id: $_id, nombre: $nombre, presupuesto: $presupuesto) {
    _id
  }
}
`;

const EDITAR_OBJETIVO = gql`

mutation EditarObjetivo($idProyecto: String!, $indexObjetivo: Int!, $campos: camposObjetivos!) {
  editarObjetivo(idProyecto: $idProyecto, indexObjetivo: $indexObjetivo, campos: $campos) {
  _id  
  }
}
`;




const CREAR_PROYECTO = gql`
  mutation CrearProyecto(
    $nombre: String!
    $presupuesto: Float!
    $fechaInicio: Date!
    $fechaFin: Date!
    $objetivos: [crearObjetivo]
  ) {
    crearProyecto(
      nombre: $nombre
      presupuesto: $presupuesto
      fechaInicio: $fechaInicio
      fechaFin: $fechaFin
      objetivos: $objetivos
    ) {
      _id
    }
  }
`;

export { EDITAR_PROYECTO, CREAR_PROYECTO, EDITAR_PROYECTO_ROL_LIDER, EDITAR_OBJETIVO };


// mutation EditarProyecto($id: String!, $fase: Enum_FaseProyecto) {
//   editarProyecto(_id: $id, fase: $fase) {
//     estado
//     fase
//     fechaFin
//     fechaInicio

//   }
// }