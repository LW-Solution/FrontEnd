import { useState } from "react";
import Toast from "../../Toast";


export default function StationsLocalizacao({
  updateStationList,
  reload,
}: {
  updateStationList: () => Promise<void>;
  reload: () => void;
}) {
  const [toast, setToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [locations, setLocations] = useState({
    location_name: "",
    latitude: "",
    longitude: "",
    permissionsId: [1],
  });

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setLocations((prevlocations) => ({
      ...prevlocations,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      await window.stations3001.post("locations", locations);
      setToastMessage(`Localização cadastrada com sucesso!`);
      setToast(true);

      setLocations({
        location_name: "",
        latitude: "",
        longitude: "",
        permissionsId: [1],
      });

      updateStationList();
      reload();

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
        <h2 className="mb-3">Cadastro de Localização</h2>
        <form >
          <div className="mb-2">
            <label htmlFor="location_name" className="form-label">
              Nome da Localização:
            </label>
            <input
              type="text"
              id="location_name"
              name="location_name"
              value={locations.location_name}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="latitude" className="form-label">
              Latitude:
            </label>
            <input
              type="text"
              id="latitude"
              name="latitude"
              value={locations.latitude}
              onChange={handleChange}
              className="form-control"
              required
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
              value={locations.longitude}
              onChange={handleChange}
              className="form-control"
              required
            />
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
