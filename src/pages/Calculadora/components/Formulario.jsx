import { Input, Button, Form, Alert, Spinner } from "@heroui/react";
import { useState, useContext } from "react";
import { AlquileresContext } from "../context/AlquileresContext";
import { formaterNumber } from "../../../utils/formaterNumber";
import { useSnackbar } from "notistack";

const Formulario = ({ valor, setValor, fecha, setFecha, onCalcular, loading }) => {
  const { calcularAlquiler } = useContext(AlquileresContext);
  const { enqueueSnackbar } = useSnackbar();

  const [meses, setMeses] = useState(1);
  const [indice, setIndice] = useState("ICL");
  const [error, setError] = useState("");

  const handleValorChange = (e) => {
    const input = e.target.value;
    const numeric = input.replace(/\D/g, "");
    const formatted = numeric ? formaterNumber(numeric) : "";
    setValor(formatted);
  };

  const handleFechaChange = (e) => {
    setFecha(e.target.value);
  };

  const validarCampos = () => {
    if (!valor || valor.trim() === "" || Number(valor.replace(/\./g, "")) === 0) {
      enqueueSnackbar("El valor inicial es obligatorio y debe ser mayor que 0.", {
        variant: "error",
      });
      return false;
    }
    if (!fecha) {
      enqueueSnackbar("La fecha de inicio es obligatoria.", { variant: "error" });
      return false;
    }
    if (!meses || meses < 1) {
      enqueueSnackbar("Debe seleccionar un período de actualización válido.", {
        variant: "error",
      });
      return false;
    }
    if (!indice || indice.trim() === "") {
      enqueueSnackbar("Debe seleccionar un índice de actualización.", {
        variant: "error",
      });
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validarCampos()) return;

    const rateFormateado =
      indice.toLowerCase() === "casa propia" ? "casa_propia" : indice.toLowerCase();

    const params = {
      amount: Number(valor.replace(/\./g, "")),
      date: fecha,
      months: meses,
      rate: rateFormateado,
    };

    onCalcular(params, calcularAlquiler);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div className="w-full">
        {error && (
          <Alert color="danger" className="mb-4" closeable onClose={() => setError("")}>
            {error}
          </Alert>
        )}

        <div className="px-6 pt-6">
          <h3 className="block text-lg font-medium text-gray-700">
            Valor inicial del alquiler
          </h3>
          <input
            value={valor}
            onChange={handleValorChange}
            className="w-full px-4 py-2 mb-3 text-gray-700 bg-gray-200 border rounded-lg focus:outline-none focus:border-indigo-500 dark:bg-gray-700 dark:text-gray-300"
            placeholder="Ej: 100.000"
            type="text"
            inputMode="numeric"
          />
        </div>

        <div className="px-6 mt-4">
          <h3 className="block text-lg font-medium text-gray-700">
            Fecha de inicio de contrato
          </h3>
          <input
            id="start-date"
            type="date"
            value={fecha}
            onChange={handleFechaChange}
            className="w-full px-4 py-2 mb-3 text-gray-700 bg-gray-200 border rounded-lg focus:outline-none focus:border-indigo-500 dark:bg-gray-700 dark:text-gray-300"
          />
        </div>

        <div className="px-6 mt-4">
          <h3 className="block text-lg font-medium text-gray-700">
            Cada cuanto se actualiza (meses)
          </h3>
          <div className="flex flex-wrap gap-2">
            {[...Array(12)].map((_, i) => (
              <Button
                key={i + 1}
                color="primary"
                size="sm"
                variant={meses === i + 1 ? "solid" : "flat"}
                className={`px-3 py-1 text-gray-700 bg-gray-200 rounded-md ${meses === i + 1 ? "ring-2 ring-blue-500" : ""
                  }`}
                onPress={() => setMeses(i + 1)}
              >
                {i + 1}
              </Button>
            ))}
          </div>
        </div>

        <div className="px-6 mt-4 space-y-2">
          <h3 className="block text-lg font-medium text-gray-700">
            Índice de actualización
          </h3>
          <div className="flex flex-wrap gap-2">
            {["ICL", "IPC", "Casa Propia", "CAC", "CER", "IS", "IPIM"].map((ind) => (
              <Button
                key={ind}
                color="primary"
                size="sm"
                variant={indice === ind ? "solid" : "flat"}
                className={`px-3 py-1 text-gray-700 bg-gray-200 rounded-md ${indice === ind ? "ring-2 ring-blue-500" : ""
                  }`}
                onPress={() => setIndice(ind)}
              >
                {ind}
              </Button>
            ))}
          </div>
        </div>

        <div className="mt-5 rounded-b-lg p-7 bg-gray-50">
          <Button
            color="primary"
            size="sm"
            type="submit"
            variant="solid"
            className="w-full text-lg py-7 bg-gradient-to-r from-[#1D70B7] to-[#203A8F] text-white rounded-md hover:from-[#203A8F] hover:to-[#59358B] transition-all duration-300 text-center flex justify-center items-center gap-3"
          >
            {loading ? (
              <>
                <Spinner className="w-5 h-5 border-2 border-white rounded-full animate-spin border-t-transparent" />
                <span>Calculando...</span>
              </>
            ) : (
              "Calcular"
            )}
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default Formulario;