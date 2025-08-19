// import {Card, CardHeader, CardBody, CardFooter,Spinner} from "@heroui/react";
import Formulario from "./components/Formulario";
import CardsData from "./components/CardsData";
import GraphData from "./components/GraphData";
import { useState } from "react";
// import DetailsAlquiler from "./components/DetailsAlquiler";
// import { useSnackbar } from 'notistack';

const Calculadora = () => {
  // const { enqueueSnackbar } = useSnackbar();
  // const [showDetails, setShowDetails] = useState(false);
  // const [detailsData, setDetailsData] = useState(null);
  const [loading, setLoading] = useState(false);
  // const [indiceSeleccionado, setIndiceSeleccionado] = useState("ICL");
  // const [mesSeleccionado, setMesSeleccionado] = useState("1");
  // const [valor, setValor] = useState(""); // Empieza vacío
  // const [fecha, setFecha] = useState("");
  // const handleCalcular = async (params, calcularAlquiler) => {
  //   setLoading(true);
  //   setShowDetails(false);
  //   setDetailsData(null);
  //   setIndiceSeleccionado(params.rate);
  //   setMesSeleccionado(params.months);

  //   try {
  //     const data = await calcularAlquiler(params);
  //     setDetailsData(data.data);
  //     setShowDetails(true);
  //   // eslint-disable-next-line no-unused-vars
  //   } catch (error) {
  //     enqueueSnackbar('Error al procesar los datos, datos inválidos o no disponibles.', {
  //       variant: 'error',
  //     });
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div
      
      
    >
      {/* <div className="w-full max-w-4xl bg-white rounded-lg shadow-xl font-terciaria">
      
        {!showDetails && (
          <Card>
            <CardHeader className="bg-gradient-to-r from-[#1D70B7] to-[#203A8F] text-white p-6 rounded-t-lg flex flex-col items-center justify-center">
              <h1 className="text-3xl font-bold text-center">Calculadora de Alquileres</h1>
            </CardHeader>
            <CardBody>
              <Formulario onCalcular={handleCalcular} loading={loading}  valor={valor}
      setValor={setValor}
      fecha={fecha}
      setFecha={setFecha}/>
            </CardBody>
            <CardFooter />
          </Card>
        )}

       
        {showDetails && detailsData && (
          <DetailsAlquiler
            data={detailsData}
            indice={indiceSeleccionado}
            meses={mesSeleccionado}
            onVolver={() => {
              setShowDetails(false);
              setDetailsData(null);
              setLoading(false);
            }}
          />
        )}
      </div> */}

      {/* Muestra tarjetas y gráfico si no hay detalles ni está cargando */}
      { !loading && (
        <>
          {/* <div className="w-full max-w-8xl">
            <CardsData />
          </div> */}
          <div className="w-full  max-w-8xl">
            <GraphData />
          </div>
        </>
      )}
    </div>
  );
};

export default Calculadora;