import React, { useEffect, useContext, useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Spinner } from "@heroui/react";
import { PiNotePencil } from "react-icons/pi";
import { TbHomeDollar } from "react-icons/tb";
import { FiShoppingCart } from "react-icons/fi";
import { MdCheckCircleOutline } from "react-icons/md";
import { AlquileresContext } from "../context/AlquileresContext";

const CardsData = () => {
  const { statsAlquiler } = useContext(AlquileresContext);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    statsAlquiler()
      .then(data => setStats(data))
      .finally(() => setLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 font-terciaria">
      {/* Card 1 */}
      <Card>
        <CardHeader className="bg-[#359df8] text-white p-6 rounded-lg flex flex-col items-center justify-center">
          <h2 className="font-semibold text-center text-7xl"><PiNotePencil /></h2>
        </CardHeader>
        <CardBody className="bg-[#359df8] text-white p-6 rounded-lg flex flex-col items-center justify-center font-bold text-2xl min-h-[120px]">
          <p>Aumento por ICL</p>
          {loading ? (
            <Spinner className="w-8 h-8 border-4 border-white rounded-full animate-spin border-t-transparent"    />
          ) : (
            <>
              <p className='text-4xl font-semibold'>{stats.iclLastIncreasePercentage.value} %</p>
              <hr className="w-1/6 mx-auto my-4 border-1"></hr>
              <p className='text-xs capitalize'>
                {new Date(stats.iclLastIncreasePercentage.date).toLocaleString('es-AR', { month: 'long', year: 'numeric' })}
              </p>
            </>
          )}
        </CardBody>
        <CardFooter />
      </Card>

      {/* Card 2 */}
      <Card>
        <CardHeader className="bg-[#2a75d6] text-white p-6 rounded-t-lg flex flex-col items-center justify-center">
          <h2 className="font-semibold text-center text-7xl"><MdCheckCircleOutline /></h2>
        </CardHeader>
        <CardBody className="bg-[#2a75d6] text-white p-6 rounded-lg flex flex-col items-center justify-center font-bold text-2xl min-h-[120px]">
          <p>Aumento por Casa Propia</p>
          {loading ? (
            <Spinner className="w-8 h-8 border-4 border-white rounded-full animate-spin border-t-transparent" />
          ) : (
            <>
              <p className='text-4xl font-semibold'>{stats.casaPropiaRate[0].annual_var} %</p>
              <hr className="w-1/6 mx-auto my-4 border-1"></hr>
              <p className='text-xs capitalize'>
                {new Date(stats.casaPropiaRate[0].date).toLocaleString('es-AR', { month: 'long', year: 'numeric' })}
              </p>
            </>
          )}
        </CardBody>
        <CardFooter />
      </Card>

      {/* Card 3 */}
      <Card>
        <CardHeader className="bg-[#2856bb] text-white p-6 rounded-t-lg flex flex-col items-center justify-center">
          <h2 className="font-semibold text-center text-7xl"><TbHomeDollar /></h2>
        </CardHeader>
        <CardBody className="bg-[#2856bb] text-white p-6  rounded-lg flex flex-col items-center justify-center font-bold text-2xl min-h-[120px]">
          <p>IPC</p>
          {loading ? (
            <Spinner className="w-8 h-8 border-4 border-white rounded-full animate-spin border-t-transparent" />
          ) : (
            <>
              <p className='text-4xl font-semibold'>{stats.ipcRate[0].annual_var} %</p>
              <hr className="w-1/6 mx-auto my-4 border-1"></hr>
              <p className='text-xs capitalize'>
                {new Date(stats.ipcRate[0].date).toLocaleString('es-AR', { month: 'long', year: 'numeric' })}
              </p>
            </>
          )}
        </CardBody>
        <CardFooter />
      </Card>

      {/* Card 4 */}
      <Card>
        <CardHeader className="bg-[#203A8F] text-white p-6 rounded-t-lg flex flex-col items-center justify-center">
          <h2 className="font-semibold text-center text-7xl"><FiShoppingCart /></h2>
        </CardHeader>
        <CardBody className="bg-[#203A8F] text-white  rounded-lg flex flex-col items-center justify-center font-bold text-2xl min-h-[120px] p-12">
          <p>Alquileres Calculados.</p>
          {loading ? (
            <Spinner className="w-8 h-8 border-4 border-white rounded-full animate-spin border-t-transparent" />
          ) : (
            <>
              <p className='text-4xl font-semibold'>{stats.calcUses.toLocaleString('es-AR')}</p>
            </>
          )}
        </CardBody>
        <CardFooter />
      </Card>
    </div>
  );
};

export default CardsData;