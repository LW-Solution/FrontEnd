import { useState, useEffect } from "react";
import Toast from "../../Toast";

export default function StationsCreate({
  updateStationList,
  reload,
}: {
  updateStationList: () => Promise<void>;
  reload: () => void;
}) {
  const [toast, setToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [locations, setLocations] = useState({
    id_location: "",
    location_name: "",
    latitude: "",
    longitude: "",
    permissionsId: [1],
  });
  const [station, setStation] = useState({
    station_description: "",
    station_mac_address: "",
    location: {
      id_location: "",
      location_name: "",
      latitude: "",
      longitude: "",
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
  }, [reload]);

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setStation((prevstation) => ({
      ...prevstation,
      [name]: value,
    }));
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLocation = locations.find(
      (location) => location.location_name === e.target.value
    );

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

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      await window.stations3001.post("station", station);
      setToastMessage(`Estação cadastrada com sucesso!`);
      setToast(true);

      setLocations({
        id_location: "",
        location_name: "",
        latitude: "",
        longitude: "",
        permissionsId: [1],
      });

      setStation({
        station_description: "",
        station_mac_address: "",
        location: {
          id_location: "",
          location_name: "",
          latitude: "",
          longitude: "",
        },
        permissionsId: [1],
      });

      updateStationList();
      //reload();
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
            <label htmlFor="station_description" className="form-label">
              UID:
            </label>
            <input
              type="text"
              id="station_mac_address"
              name="station_mac_address"
              value={station.station_mac_address}
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
            <select
              name="latitude"
              value={station.location.latitude}
              className="form-control"
              disabled
            >
              <option value="">Latitude</option>
              {(Array.isArray(locations) ? locations : []).map((location) => (
                <option key={location.id} value={location.latitude}>
                  {location.latitude}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-2">
            <label htmlFor="longitude" className="form-label">
              Longitude:
            </label>
            <select
              name="longitude"
              value={station.location.longitude}
              className="form-control"
              disabled
            >
              <option value="">Longitude</option>
              {(Array.isArray(locations) ? locations : []).map((location) => (
                <option key={location.id} value={location.longitude}>
                  {location.longitude}
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
