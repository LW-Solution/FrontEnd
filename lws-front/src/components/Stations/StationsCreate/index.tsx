import { useState, useEffect } from "react";
import Toast from "../../Toast";

export default function StationsCreate({
  updateStationList,
}: {
  updateStationList: () => Promise<void>;
}) {
  const [toast, setToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [locations, setLocations] = useState({
    id_location: "",
    location_name: "",
    coordinate: "",
    permissionsId: [1],
  });
  const [station, setStation] = useState({
    station_description: "",
    location: {
      id_location: "",
      location_name: "",
      coordinate: "",
    },
  });

  useEffect(() => {
    window.stations3001
      .get("locations")
      .then((response) => {
        setLocations(response.data);
      })
      .catch((error) => {
        console.error("Ocorreu um erro!", error);
      });
  }, []);

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setStation((prevstation) => ({
      ...prevstation,
      [name]: value,
    }));
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLocation = locations.find(location => location.location_name === e.target.value);
    
    setStation({
      ...station,
      location: {
        ...station.location,
        id_location: selectedLocation ? selectedLocation.id_location : '',
        location_name: e.target.value,
        coordinate: selectedLocation ? selectedLocation.coordinate : '',
      },
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      console.log(station)
      await window.stations3001.post("station", station);
      setToastMessage(`Estação cadastrada com sucesso!`);
      setToast(true);

      setLocations({
        id_location: "",
        location_name: "",
        coordinate: "",
        permissionsId: [1],
      });

      setStation({
        station_description: "",
        location: {
          id_location: "",
          location_name: "",
          coordinate: "",
        },
        permissionsId: [1],
      });

      updateStationList();
    } catch (error) {
      console.error("Erro na requisição:", error);
      setToast(true);
    }
  };

  return (
    <div className="container mt-2">
      <Toast
        show={toast}
        toggle={() => setToast(false)}
        type={toastMessage.includes("sucesso") ? "success" : "danger"}
      >
        {toastMessage}
      </Toast>

      <div className="card p-4">
        <h2 className="mb-3">Cadastro de Estações</h2>
        <form>
          <div className="mb-2">
            <label htmlFor="station_description" className="form-label">
              Descrição da Estação:
            </label>
            <input
              type="text"
              id="station_description"
              name="station_description"
              value={station.station_description}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="location_name" className="form-label">
              Localização:
            </label>
            <select
              name="location_name"
              value={station.location.location_name}
              onChange={handleLocationChange}
              className="form-control"
            >
              {(Array.isArray(locations) ? locations : []).map((location) => (
                <option key={location.id} value={location.location_name}>
                  {location.location_name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-2">
            <label htmlFor="coordinate" className="form-label">
              Coordenadas Geográficas:
            </label>
            <select 
              name="coordinate" 
              value={station.location.coordinate} 
              className="form-control"
              disabled
            >
              {(Array.isArray(locations) ? locations : []).map((location) => (
                <option key={location.id} value={location.coordinate}>
                  {location.coordinate}
                </option>
              ))}
            </select>
          </div>

          <input type="hidden" name="role" value="station" />

          <button
            type="submit"
            className="btn btn-secondary"
            onClick={handleSubmit}
          >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
