import { gql } from '@apollo/client';

const GET_INSCRIPCIONES = gql`
  query Inscripciones {
    Inscripciones {
      _id
      estado
      estudiante {
        _id
        nombre
        apellido
        correo
      }
      proyecto {
        _id
        nombre
        fase
        estado
        objetivos {
          descripcion
          tipo
        }
        lider {
          _id
          nombre
        }
      }
    }
  }
`;

export { GET_INSCRIPCIONES };
