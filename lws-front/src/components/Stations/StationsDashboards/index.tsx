import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IData } from '../../../types';

const StationsDashboards = () => {
    const { id_station } = useParams();
    const [data, setData] = useState<IData | null>(null);
    console.log(id_station)

    useEffect(() => {
      const fetchData = async ()=>{
        try {
          const response = await window.stations3001.get(`dashboard/${id_station}`);
          setData(response.data);
          console.log(response.data)
        } catch (error) {
          console.error("Erro da requisição:",error)
        }
      }
      fetchData();
    },[id_station]);

  return (
    <div>
      <h1>StationsDashboards</h1>
      {data && (
        <div>
          <p>ID: {id_station}</p>
          <p>DESCRIÇÃO: {data.id_estacao.station_description}</p>
          <p>LOCAL: {data.id_estacao.location.location_name}</p>
        </div>
      )}
      <p>ID STATION{JSON.stringify(id_station)}</p>
      <p>{JSON.stringify(data)}</p>
    </div>
  )
}

export default StationsDashboards