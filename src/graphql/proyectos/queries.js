import { gql } from '@apollo/client'

const PROYECTOS = gql`
  query Proyectos {
    Proyectos {
      _id
      nombre
      estado
      fase
      presupuesto
      objetivos {
        _id
        descripcion
        tipo
      }
      lider {
        _id
        correo
      }
      inscripciones {
        estado
        proyecto{   # esta generando conflicto de  null con otra pagina cuando pido al mas 
        # evidentemente es por que esta esta informacion no la puede traer es un nivel mas 
        # adentro dando la vuelto completa
          _id
          
        }
        estudiante {
          _id
          
        }
      }
    }
  }
`;

export { PROYECTOS };