import React, { createContext,  useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const AlquileresContext = createContext()

const API_URL = import.meta.env.VITE_ALQUILER_API_URL;
const API_KEY = import.meta.env.VITE_ALQUILER_API_KEY;
const API_URL_STATS = import.meta.env.VITE_STATS_ALQUILER_API_URL;

export const AlquileresProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const calcularAlquiler = async (params) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/calculate`, {
        method: "POST",
        headers: {
          "X-RapidAPI-Host": "arquilerapi1.p.rapidapi.com",
          "Content-Type": "application/json",
          "X-RapidAPI-Key": API_KEY,
        },
        body: JSON.stringify(params),
      });
      if (!response.ok) throw new Error("Error al calcular alquiler");
      const data = await response.json();
      setLoading(false);
      return data;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return null;
    }
  };

  const statsAlquiler = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL_STATS}/stats`, {
        method: "GET",
        headers: {
          "X-RapidAPI-Host": "arquilerapi1.p.rapidapi.com",
          "X-RapidAPI-Key": API_KEY,
        },
      });
      if (!response.ok) throw new Error("Error al calcular alquiler");
      const data = await response.json();
      setLoading(false);
      return data;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return null;
    }
  };
  return (
    <AlquileresContext.Provider value={{ calcularAlquiler,statsAlquiler, loading, error }}>
      {children}
    </AlquileresContext.Provider>
  );
};
