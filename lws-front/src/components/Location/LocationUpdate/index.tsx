import { useState, useEffect } from "react";
import Toast from "../../Toast";

export default function LocationUpdate({
  locationId,
  updateLocationList,
  reload,
}: {
  locationId: string | null;
  updateLocationList: () => Promise<void>;
  reload: () => void;
}) {
  const [toast, setToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [location, setLocation] = useState({
    location_name: "",
    latitude: "",
    longitude: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Carregar os detalhes da estação a ser atualizada
        const response = await window.stations3001.get(
          `locations/${locationId}`
        );
        const { location_name, latitude, longitude } = response.data;

        setLocation({
          location_name: location_name,
          latitude: latitude,
          longitude: longitude,
        });
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    };

    if (locationId) {
      fetchData();
    }
  }, [locationId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocation((prevLocation) => ({
      ...prevLocation,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await window.stations3001.put(
        `locations/${locationId}`,
        location
      );
      setToastMessage("Estação atualizada com sucesso!");
      setToast(true);
      updateLocationList();
      reload();
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

      <div className="card p-4">
        <h2 className="mb-3">Editar Localização</h2>
        <form>
          <div className="mb-2">
            <label htmlFor="location_name" className="form-label">
              Nome:
            </label>
            <input
              type="text"
              id="location_name"
              name="location_name"
              value={location.location_name}
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
              value={location.latitude}
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
              value={location.longitude}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <input type="hidden" name="role" value="station" />

          <button
            type="submit"
            className="btn btn-secondary"
            onClick={handleUpdate}
          >
            Atualizar
          </button>
        </form>
      </div>
    </div>
  );
}
