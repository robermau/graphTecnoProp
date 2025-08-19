import React from "react";
import { AlquileresContext } from "./AlquileresContext";

const AlquileresProvider = ({ children }) => {


  return (
    <AlquileresContext.Provider value={AlquileresContext._currentValue}>
      {children}
    </AlquileresContext.Provider>
  );
};

export default AlquileresProvider;