import { gql } from '@apollo/client'

const PROYECTOS = gql`
  query Proyectos {
    Proyectos {
      _id
      nombre
      estado
      fase
      objetivos {
        descripcion
        tipo
      }
      lider {
        _id
        correo
      }
      inscripciones {
        estado
        proyecto{   # esta generando conflicto de  null con otra pagina
          _id
          nombre
        }
        estudiante {
          _id
          
        }
      }
    }
  }
`;

export { PROYECTOS };