import { gql } from '@apollo/client';

const CREAR_INSCRIPCION = gql`
  mutation Mutation($proyecto: String!) {
    crearInscripcion(proyecto: $proyecto) {
      _id
    }
  }
`;

const APROBAR_INSCRIPCION = gql`

  mutation AprobarInscripcion($idInscripcion: String!) {
    aprobarInscripcion(_idInscripcion: $idInscripcion) {
     _id  
  }
}
`;


const RECHAZAR_INSCRIPCION = gql`
mutation RechazarInscripcion($idInscripcion: String!) {
  rechazarInscripcion(_idInscripcion: $idInscripcion) {
    _id  
  }
}
`;

export { CREAR_INSCRIPCION, APROBAR_INSCRIPCION, RECHAZAR_INSCRIPCION };
