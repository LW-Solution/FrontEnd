import { useState, useEffect } from "react";
import Toast from "../../Toast";

export default function StationsUpdate({
  stationId,
  updateStationList,
}: {
  stationId: string | null;
  updateStationList: () => Promise<void>;
}) {
  const [toast, setToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [locations, setLocations] = useState({
    id_location: "",
    location_name: "",
    latitude: "",
    longitude: "",
  });
  const [station, setStation] = useState({
    station_description: "",
    location: {
      id_location: "",
      location_name: "",
      latitude: "",
      longitude: "",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Carregar os detalhes da estação a ser atualizada
        const response = await window.stations3001.get(`station/${stationId}`);
        const { station_description, location } = response.data;

        setStation({
          station_description,
          location: {
            ...location
          },
        });
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    };

    if (stationId) {
      fetchData();
    }
  }, [stationId]);

  useEffect(() => {
    // Carregar as localizações disponíveis para seleção
    const fetchLocations = async () => {
      try {
        const response = await window.stations3001.get("locations");
        setLocations(response.data);
      } catch (error) {
        console.error("Erro ao carregar localizações:", error);
      }
    };

    fetchLocations();
  }, [locations]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStation((prevStation) => ({
      ...prevStation,
      [name]: value,
    }));
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLocation = locations.find(location => location.location_name === e.target.value);

    setStation({
      ...station,
      location: {
        ...station.location,
        id_location: selectedLocation ? selectedLocation.id_location : "",
        location_name: e.target.value,
        latitude: selectedLocation ? selectedLocation.latitude : "",
        longitude: selectedLocation ? selectedLocation.longitude : "",
      },
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await window.stations3001.put(`station/${stationId}`, station);
      setToastMessage("Estação atualizada com sucesso!");
      setToast(true);
      updateStationList();
    } catch (error) {
      console.error("Erro ao atualizar a estação:", error);
      setToastMessage("Erro ao atualizar a estação.");
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

      {stationId ? (
        <div className="card p-4">
          <h2 className="mb-3">Editar Estação</h2>
          <form onSubmit={handleUpdate}>
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
                <option value="">Selecione a localização</option>
                {(Array.isArray(locations) ? locations : []).map((location) => (
                <option key={location.id} value={location.location_name}>
                  {location.location_name}
                </option>
                ))}
              </select>
            </div>
            <div className="mb-2">
              <label htmlFor="latitude" className="form-label">
                Latitude:
              </label>
              <input
                type="text"
                id="latitude"
                name="latitude"
                value={station.location.latitude}
                className="form-control"
                disabled
              />
            </div>
            <div className="mb-2">
              <label htmlFor="longitude" className="form-label">
                Longitude:
              </label>
              <input
                type="text"
                id="longitude"
                name="longitude"
                value={station.location.longitude}
                className="form-control"
                disabled
              />
            </div>

            <button type="submit" className="btn btn-secondary">
              Atualizar
            </button>
          </form>
        </div>
      ) : (
        <p className="text-center">Selecione a estação que deseja editar.</p>
      )}
    </div>
  );
}
