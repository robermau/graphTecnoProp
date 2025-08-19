import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardBody, CardFooter, Button } from "@heroui/react";
import { useState, useContext, useEffect } from 'react';
import { AlquileresContext } from "../context/AlquileresContext";

const BUTTONS = [
  { key: "cacRate", label: "CAC", color: "bg-pink-300", lineColor: "#db2777" },
  { key: "ipcRate", label: "IPC", color: "bg-green-300", lineColor: "#22c55e" },
  { key: "casaPropiaRate", label: "Casa Propia", color: "bg-yellow-300", lineColor: "#eab308" },
  { key: "cerRate", label: "CER", color: "bg-purple-300", lineColor: "#a21caf" },
  { key: "uvaRate", label: "UVA", color: "bg-red-300", lineColor: "#dc2626" },
];

const GraphData = () => {
  const { statsAlquiler } = useContext(AlquileresContext);
  const [selected, setSelected] = useState(["cacRate"]);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    statsAlquiler()
      .then(data => setStats(data))
      .catch(err => console.error("Error fetching stats:", err));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleSelected = (key) => {
    setSelected(prev =>
      prev.includes(key)
        ? prev.filter(k => k !== key)
        : [...prev, key]
    );
  };

  const allDates = stats
    ? Array.from(
        new Set(
          selected
            .flatMap(key => (stats[key] || []).map(item => item.date))
        )
      ).sort()
    : [];

  const chartData = allDates.map(date => {
    const row = { date };
    selected.forEach(key => {
      const found = stats[key]?.find(item => item.date === date);
      row[key] = found ? found.annual_var : null;
    });
    return row;
  });

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString('es-AR', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="flex flex-col items-start w-full gap-6 lg:flex-row font-terciaria">
      {/* Gráfico */}
      <div className="flex flex-col w-full p-5 bg-white rounded-lg shadow lg:w-1/2">
        <div className="flex flex-wrap gap-2 mb-4">
          {BUTTONS.map(btn => (
            <Button
              key={btn.key}
              color="primary"
              size="sm"
              variant={selected.includes(btn.key) ? "solid" : "flat"}
              className={`px-3 py-1 text-gray-700 ${btn.color} rounded-md font-semibold border ${selected.includes(btn.key) ? "ring-2 ring-offset-2 ring-blue-500" : ""}`}
              onPress={() => toggleSelected(btn.key)}
            >
              {btn.label}
            </Button>
          ))}
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tickFormatter={formatDate} />
            <YAxis />
            <Tooltip labelFormatter={formatDate} />
            <Legend />
            {selected.map(key => {
              const btn = BUTTONS.find(b => b.key === key);
              return (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={btn?.lineColor || "#2563eb"}
                  strokeWidth={3}
                  dot={{ r: 5 }}
                  activeDot={{ r: 8 }}
                  name={btn?.label}
                  connectNulls
                />
              );
            })}
          </LineChart>
        </ResponsiveContainer>
      </div>
      {/* Card */}
      {/* <div className="flex items-stretch w-full lg:w-1/2">
        <Card className="flex flex-col flex-1 h-[410px] font-terciaria">
          <CardHeader className="bg-[#203A8F] text-white p-6 rounded-t-lg flex flex-col items-center justify-center">
            <h2 className="text-2xl font-semibold text-center">Indices interanuales</h2>
          </CardHeader>
          <CardBody className="bg-[#203A8F] text-white p-8 flex flex-col items-center justify-center text-1xl rounded-b-lg">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo, at aliquam mollitia natus saepe expedita aspernatur aliquid maiores neque. Facilis illo eaque architecto recusandae eveniet fugiat nostrum ducimus. Perferendis, alias.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo, at aliquam mollitia natus saepe expedita aspernatur aliquid maiores neque. Facilis illo eaque architecto recusandae eveniet fugiat nostrum ducimus. Perferendis, alias.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo, at aliquam mollitia natus saepe expedita aspernatur aliquid maiores neque. Facilis illo eaque architecto recusandae eveniet fugiat nostrum ducimus. Perferendis, alias.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo, at aliquam mollitia natus saepe expedita aspernatur aliquid maiores neque. Facilis illo eaque architecto recusandae eveniet fugiat nostrum ducimus. Perferendis, alias.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo, at aliquam mollitia natus saepe expedita aspernatur aliquid maiores neque. Facilis illo eaque architecto recusandae eveniet fugiat nostrum ducimus. Perferendis, alias.</p>
          </CardBody>
          <CardFooter />
        </Card>
      </div> */}
    </div>
  );
};

export default GraphData;