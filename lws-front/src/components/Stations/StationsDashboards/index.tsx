import { useParams } from 'react-router-dom';

const StationsDashboards = () => {
    const { id_station } = useParams();
    console.log(id_station)

  return (
    <div>StationsDashboards: {id_station}</div>
  )
}

export default StationsDashboards