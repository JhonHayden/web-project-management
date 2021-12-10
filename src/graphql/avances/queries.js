import { gql } from '@apollo/client';

const GET_AVANCES = gql`
    query Avances($idProyecto: String!) {
        Avances(idProyecto: $idProyecto) {
            _id
            creadoPor {
                nombre
            }  
            descripcion
            fecha
            proyecto {
                nombre
            }
        }
    }
`;

export { GET_AVANCES };
