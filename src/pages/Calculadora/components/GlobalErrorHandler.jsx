import React, { useContext } from "react";
import { AlquileresContext } from "../context/AlquileresContext";
const GlobalErrorHandler = () => {
  const { error } = useContext(AlquileresContext);

  if (!error) return null;

  return (
    <div className="fixed z-50 px-4 py-2 text-white transform -translate-x-1/2 bg-red-600 rounded shadow-lg bottom-4 left-1/2">
      Hubo un error, intente nuevamente más tarde.
    </div>
  );
};

export default GlobalErrorHandler;