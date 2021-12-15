import { gql } from '@apollo/client';

const GET_INSCRIPCIONES = gql`
  query Inscripciones {
    Inscripciones {
      _id
      estado
      fechaIngreso
      fechaEgreso
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
        fechaInicio
        fechaFin
        presupuesto
        objetivos {
          descripcion
          tipo
        }
        lider {
          _id
          nombre
        apellido

        }
        # avances{
        #   _id
        # }
      }
    }
  }
`;

export { GET_INSCRIPCIONES };
