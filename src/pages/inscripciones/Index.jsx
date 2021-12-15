import React, { useEffect } from 'react';
import { GET_INSCRIPCIONES } from 'graphql/inscripciones/queries';
import PrivateRoute from 'components/PrivateRoute';
import PrivateComponent from 'components/PrivateComponent';
import { useMutation, useQuery } from '@apollo/client';
import { APROBAR_INSCRIPCION } from 'graphql/inscripciones/mutaciones';
import { RECHAZAR_INSCRIPCION } from 'graphql/inscripciones/mutaciones';
import ButtonLoading from 'components/ButtonLoading';
import { toast } from 'react-toastify';
import {
  AccordionStyled,
  AccordionSummaryStyled,
  AccordionDetailsStyled,
} from 'components/Accordion';

const IndexInscripciones = () => {


  const { data, loading, error, refetch } = useQuery(GET_INSCRIPCIONES); // consulta y query a las inscripciones 


  console.log("Inscripciones con el console.log : ", data)


  useEffect(() => {

    console.log("Inscripciones con el usEffect : ", data)
  }, [data])

  if (loading) return <div>Cargando...</div>;//


  return (


    <PrivateRoute roleList={['LIDER']}> {/**me permite privar en acceso a esta pagina para roles distintos a los de roleList 
 */}
      <div className='p-10 flex flex-col'>
        <div className='self-center m-2'>
          <h1 className='text-2xl font-extrabold text-gray-900'>Lista de inscripciones </h1>
        </div>
        <div className='my-4'>
          <AccordionInscripcion
            titulo='Inscripciones aprobadas'
            data={data.Inscripciones.filter((el) => el.estado === 'ACEPTADA')}
          />
          <AccordionInscripcion
            titulo='Inscripciones pendientes'
            data={data.Inscripciones.filter((el) => el.estado === 'PENDIENTE')}
            refetch={refetch}
          />
          <AccordionInscripcion
            titulo='Inscripciones rechazadas'
            data={data.Inscripciones.filter((el) => el.estado === 'RECHAZADA')}
          />
        </div>
      </div>
    </PrivateRoute >
  )

}

const AccordionInscripcion = ({ data, titulo, refetch = () => { } }) => {
  return (
    <AccordionStyled>
      <AccordionSummaryStyled>
        {titulo} ({data.length})
      </AccordionSummaryStyled>
      <AccordionDetailsStyled>
        <div className='grid grid-cols-2'>
          {data &&
            data.map((inscripcion) => {
              return <Inscripcion inscripcion={inscripcion} refetch={refetch} />;
            })}
        </div>
      </AccordionDetailsStyled>
    </AccordionStyled>
  );
};

const Inscripcion = ({ inscripcion, refetch }) => {
  const [aprobarInscripcion, {
    data: dataMutationAprobarInscripcion,
    loading: loadingMutationAprobarInscripcion,
    error: errordataMutationAprobarInscripcion }] = useMutation(APROBAR_INSCRIPCION);
  const [rechazarInscripcion, {
    data: dataMutationRechazarInscripcion,
    loading: loadingMutationRechazarInscripcion,
    error: errorMutationRechazarInscripcion }] = useMutation(RECHAZAR_INSCRIPCION);

  useEffect(() => {
    if (dataMutationAprobarInscripcion) {
      toast.success('Inscripcion aprobada con exito');
      refetch();
    }
  }, [dataMutationAprobarInscripcion]);

  useEffect(() => {
    if (errordataMutationAprobarInscripcion) {
      toast.error('Error aprobando la inscripcion');
    }
  }, [errordataMutationAprobarInscripcion]);

  const aprobarEstadoInscripcion = () => {
    aprobarInscripcion({
      variables: {
        idInscripcion: inscripcion._id,
      },
    });
  };
  useEffect(() => {
    if (dataMutationRechazarInscripcion) {
      toast.success('Inscripcion rechazada con exito');
      refetch();
    }
  }, [dataMutationRechazarInscripcion]);

  useEffect(() => {
    if (errorMutationRechazarInscripcion) {
      toast.error('Error rechazando la inscripcion');
    }
  }, [errorMutationRechazarInscripcion]);

  const rechazarEstadoInscripcion = () => {
    rechazarInscripcion({
      variables: {
        idInscripcion: inscripcion._id,
      },
    });
  };

  return (
    <div className='bg-gray-900 text-gray-50  p-6 m-2 rounded-lg shadow-xl'>
      <div>
        <span className='mr-2'>Nombre proyecto:</span>
        <span>{inscripcion.proyecto.nombre}</span>
      </div>
      <div>
        <span className='mr-2'>Fecha ingreso:</span>
        <span>{inscripcion.fechaIngreso}</span>
      </div>
      <div>
        <span className='mr-2'>Fecha egreso:</span>
        <span>{inscripcion.fechaEgreso}</span>
        {inscripcion.fechaEgreso ? (
          <div>
            <div>
              <span className='mr-2'>Estado proyecto:</span>
              <span>{inscripcion.proyecto.estado}</span>
            </div>
            <div>
              <span className='mr-2'>Fase proyecto:</span>
              <span>{inscripcion.proyecto.fase}</span>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div>
        <span>Estudiante: </span>
        <span className='mr-1'>{inscripcion.estudiante.nombre}</span>
        <span>{inscripcion.estudiante.apellido}</span>

      </div>
      <div>
        <span className='mr-2'>Estado Inscripcion:</span>
        <span>{inscripcion.estado}</span>

      </div>
      {inscripcion.estado === 'PENDIENTE' && (
        <div className='flex justify-between mt-4'>

          <ButtonLoading
            onClick={() => {
              aprobarEstadoInscripcion();
            }}
            text='Aprobar Inscripcion'
            loading={loadingMutationAprobarInscripcion}
            disabled={false}
          />
          <ButtonLoading
            onClick={() => {
              rechazarEstadoInscripcion();
            }}
            text='Rechazar Inscripcion'
            loading={loadingMutationRechazarInscripcion}
            disabled={false}
          />
        </div>

      )}
    </div>
  );
};


export default IndexInscripciones;
