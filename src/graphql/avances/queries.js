import { gql } from '@apollo/client';

const GET_AVANCES = gql`
    query Avances($idProyecto: String!) {
        Avances(idProyecto: $idProyecto) {
            _id
            creadoPor {
                nombre
                apellido
            }  
            descripcion
            fecha
            proyecto {
                nombre
                estado
                fase
                # avances
            }
            observaciones {
                _id
                descripcionObservacion
             }
        }
    }
`;

export { GET_AVANCES };
