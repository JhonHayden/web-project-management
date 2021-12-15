import { gql } from '@apollo/client'

const PROYECTOS = gql`
  query Proyectos {
    Proyectos {
      _id
      nombre
      estado
      fechaInicio
      fechaFin
      fase
      presupuesto
      objetivos {
        _id
        descripcion
        tipo
      }
      lider {
        _id
        nombre
        apellido
        correo
      }
      avances{
          _id
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

const GET_PROYECTO = gql `
query Proyecto($idProyecto: String!) {
  Proyecto(_id: $idProyecto) {
      _id
      nombre
      estado
      fechaInicio
      fechaFin
      fase
      presupuesto
      objetivos {
        _id
        descripcion
        tipo
      }
      lider {
        _id
        nombre
        apellido
        correo
      }
      avances{
          _id
        }
      inscripciones {
        estado
       
        estudiante {
          _id
          
        }
       
      } 
  }
}

`;

export { PROYECTOS, GET_PROYECTO };