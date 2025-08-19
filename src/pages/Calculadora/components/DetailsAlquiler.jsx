import { Card, CardHeader, Divider, Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, Button } from "@heroui/react";
import moment from 'moment';
import obtenerNombreMes from "../../../utils/obtenerNombreMes";
import obtenerPeriodo from "../../../utils/obtenerPeriodo";
import React, { useState } from "react";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import { CiCalendarDate } from "react-icons/ci";
import { FaRegCalendarCheck } from "react-icons/fa";
import { VscGraphLine } from "react-icons/vsc";



const DetailsAlquiler = ({ data, indice, meses, onVolver }) => {
  const [expandedRow, setExpandedRow] = useState(null);

  const result = data;
  const hoy = moment();
  const fechasPasadas = data.filter((item) =>
    moment(item.date).isSameOrBefore(hoy)
  );
  const ultimoElemento = data[data.length - 1];
  const anteultimoElemento = data[data.length - 2];
  const resumen = [anteultimoElemento, ultimoElemento];

  const columnas = [
    { key: "periodo", label: "" },
    { key: "fecha", label: "Fecha" },
    { key: "aumento", label: "Aumento" },
    { key: "valor", label: "Valor" },
    { key: "detalle", label: "Detalle" },
  ];

  return (
    <div className="p-4 bg-[#203a8f] text-white rounded-lg space-y-6 max-w-full mx-auto">
  {/* Cartas resumen */}
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
    {resumen.map((item, index) => {
      const titulo = index === 0 ? "Desde" : "Hasta";
      const tieneFecha = !!item?.date;
      const tieneMonto = typeof item?.amount === "number";

      return (
        <Card key={index} className="bg-[#203a8f] text-white">
          <CardHeader className="flex flex-col items-center justify-center">
            <h3 className="text-base sm:text-lg">{titulo}</h3>

            <div className="mb-1 text-xs text-gray-300 sm:text-sm">
              {tieneFecha
                ? obtenerNombreMes(moment(item.date).month() + 1)
                : "Mes no disponible"}
            </div>

            <div className="text-xl font-bold sm:text-2xl">
              {tieneMonto
                ? `$${item.amount.toLocaleString("es-AR", {
                    maximumFractionDigits: 0,
                  })}`
                : "Monto no disponible"}
            </div>
          </CardHeader>
        </Card>
      );
    })}
  </div>

      {/* Datos ingresados */}
      <div className="flex flex-wrap items-center justify-center gap-2 mt-2 text-xs text-gray-300 sm:text-sm">
        <span>
          Valores Ingresados:{" "}
          <strong>${result[0].amount?.toLocaleString("es-AR")}</strong>
        </span>
        <FaRegCalendarCheck color="white" size={20} />
        <span>{moment(fechasPasadas.date).format("DD/MM/YYYY")}</span>

        <div className="flex flex-col items-center justify-center w-full gap-1 sm:flex-row sm:gap-4 sm:w-auto">
          <div className="flex items-center gap-2">
            <CiCalendarDate color="white" size={20} />
            <span>{meses} meses</span>
            <span className="flex items-center gap-2">
              <VscGraphLine color="white" size={20} />
              <span>
                {indice === "casa_propia"
                  ? "Casa Propia"
                  : indice.toUpperCase()}
              </span>
            </span>
          </div>
        </div>
      </div>

      <Divider className="my-2" />

      {/* Tabla principal */}
      <div className="overflow-x-auto">
        <Table
          isStriped
          aria-label="Resultado del cálculo"
          classNames={{
            table: "text-white min-w-[600px]",
            td: "text-sm text-center whitespace-nowrap",
            th: "text-center whitespace-nowrap",
          }}
        >
          <TableHeader>
            {columnas.map((col) => (
              <TableColumn key={col.key}>{col.label}</TableColumn>
            ))}
          </TableHeader>
          <TableBody>
            {data?.map((v, i) => (
              <React.Fragment key={i}>
                {/* Fila principal */}
                <TableRow>
                  {columnas.map((col) => {
                    let content;
                    switch (col.key) {
                      case "periodo":
                        content = obtenerPeriodo(meses, i);
                        break;
                      case "fecha":
                        content = moment(v.date).format("DD/MM/YYYY");
                        break;
                      case "aumento":
                        content = `${v.dif?.toFixed(2)} %`;
                        break;
                      case "valor":
                        content = `$${v.amount?.toLocaleString("es-AR", {
                          maximumFractionDigits: 0,
                        })}`;
                        break;
                      case "detalle":
                        content =
                          v.details?.length > 0 && (
                            <Button
                              onPress={() =>
                                setExpandedRow(expandedRow === i ? null : i)
                              }
                              className="p-1 hover:text-blue-400"
                              size="sm"
                            >
                              {expandedRow === i ? (
                                <FaEyeSlash className="w-5 h-5 mx-auto" />
                              ) : (
                                <IoEyeSharp className="w-5 h-5 mx-auto" />
                              )}
                            </Button>
                          );
                        break;
                      default:
                        content = "";
                    }
                    return <TableCell key={col.key}>{content}</TableCell>;
                  })}
                </TableRow>

                {/* Encabezado subtabla */}
                {expandedRow === i && v.details?.length > 0 && (
                  <TableRow className="bg-gray-700/40">
                    <TableCell className="text-xs font-bold uppercase tracking-wide text-gray-300 text-center px-2 w-[100px]">
                      Fecha
                    </TableCell>
                    <TableCell className="text-xs font-bold uppercase tracking-wide text-gray-300 text-center px-2 w-[100px]">
                      Valor
                    </TableCell>
                    <TableCell className="text-xs font-bold uppercase tracking-wide text-gray-300 text-center px-2 w-[120px]">
                      % Acumulado
                    </TableCell>
                    <TableCell className="text-xs font-bold uppercase tracking-wide text-gray-300 text-center px-2 w-[120px]">
                      % Mensual
                    </TableCell>
                    <TableCell className="w-[20px]" />
                  </TableRow>
                )}

                {/* Filas de subtabla */}
                {expandedRow === i &&
                  v.details?.map((d, di) => (
                    <TableRow
                      key={`detail-${i}-${di}`}
                      className="bg-gray-800/30"
                    >
                      <TableCell className="text-xs text-center px-2 w-[100px]">
                        {moment(d.date).format("DD/MM/YYYY")}
                      </TableCell>
                      <TableCell className="text-xs text-center px-2 w-[100px]">
                        {d.value}
                      </TableCell>
                      <TableCell className="text-xs text-center px-2 w-[120px]">
                        {`${d.accumulate?.toFixed(2)}%`}
                      </TableCell>
                      <TableCell className="text-xs text-center px-2 w-[120px]">
                        {d.month_before !== undefined
                          ? `${d.month_before.toFixed(2)}%`
                          : "-"}
                      </TableCell>
                      <TableCell className="w-[20px]" />
                    </TableRow>
                  ))}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Botón Volver */}
      <div className="flex justify-center mt-6">
        <Button
          color="primary"
          size="md"
          variant="solid"
          className="w-full max-w-xs text-lg py-4 bg-gradient-to-r from-[#1D70B7] to-[#203A8F] text-white rounded-md hover:from-[#203A8F] hover:to-[#59358B] transition-all duration-300 text-center flex justify-center items-center"
          onPress={() => onVolver && onVolver()}
        >
          Volver
        </Button>
      </div>
    </div>
  );
};

export default DetailsAlquiler;