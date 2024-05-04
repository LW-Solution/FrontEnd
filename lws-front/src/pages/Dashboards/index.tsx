import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IData } from "../../types";
import { LineChart } from "../../components/Charts/LineChart";

const StationsDashboards = () => {
  const { id_station } = useParams();
  const [data, setData] = useState<IData | null>(null);
  console.log(id_station);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await window.stations3001.get(
          `dashboard/${id_station}`
        );
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Erro da requisição:", error);
      }
    };
    fetchData();
  }, [id_station]);

  const selectedMonth = 5; // Junho (os meses no JavaScript começam em 0)
  const selectedYear = 2022;

  const filteredData =
    data && data.measurements
      ? data.measurements.filter((measurement) => {
          const date = new Date(measurement.data);
          return (
            date.getMonth() === selectedMonth &&
            date.getFullYear() === selectedYear
          );
        })
      : [];

  const chartData =
    data && data.measurements
      ? [
          ["Data", "Temperatura"],
          ...data.measurements.map((measurement) => [
            measurement.data,
            measurement.value,
          ]),
        ]
      : [];

  return (
    <div>
      {data && (
        <LineChart
          data={chartData}
          title={data.measurements[0].parameter_type.parameter_name}
        />
      )}
      {/* <h1>StationsDashboards</h1>
      {data && (
        <div>
          <p>ID: {id_station}</p>
          <p>DESCRIÇÃO: {data.id_estacao.station_description}</p>
          <p>LOCAL: {data.id_estacao.location.location_name}</p>
        </div>
      )}
      <p>ID STATION{JSON.stringify(id_station)}</p>
      <p>{JSON.stringify(data)}</p> */}
    </div>
  );
};

export default StationsDashboards;
