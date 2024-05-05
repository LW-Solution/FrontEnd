import React, { useState, useEffect } from "react";
import Toast from "../../Toast";

export default function AlertsUpdate({
  alertId,
  updateAlertList,
}: {
  alertId: string | null;
  updateAlertList: () => Promise<void>;
}) {
  const [toast, setToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [station, setStation] = useState({
    station_description: "",
    location: {
      location_name: "",
      latitude: "",
      longitude: "",
    },
  });

  const [parameterType, setParameterType] = useState({
    description: "",
    factor: "",
    offset: "",
    unit: {
      id_unit: "",
      unit: "",
    },
  });

  const [alert, setAlert] = useState({
    description: "",
    condition: "",
    value: "",
    station: {
      id_station: "",
      station_description: "",
      location: {
        id_location: "",
        location_name: "",
        latitude: "",
        longitude: "",
      },
    },
    parameter_type: {
      id_parameter_type: "",
      description: "",
      factor: "",
      offset: "",
      unit: {
        id_unit: "",
        unit: "",
      },
    },
  });

  useEffect(() => {
    window.stations3001
      .get("station")
      .then((response) => {
        setStation(response.data);
      })
      .catch((error) => {
        console.error("Ocorreu um erro!", error);
      });
    window.stations3001
      .get("parameterType")
      .then((response) => {
        setParameterType(response.data);
      })
      .catch((error) => {
        console.error("Ocorreu um erro!", error);
      });
  }, [alert]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Carregar os detalhes do parâmetro da estação
        const response = await window.stations3001.get(`alert/${alertId}`);
        const { description, value, condition, station, parameter_type } =
          response.data;

        setAlert({
          ...alert,
          condition: condition,
          description: description,
          value: value,
          station: {
            ...station,
          },
          parameter_type: {
            ...parameter_type,
          },
        });
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    };

    if (alertId) {
      fetchData();
    }
  }, [alertId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAlert((prevAlert) => ({
      ...prevAlert,
      [name]: value,
    }));
  };

  const handleStationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedStation = station.find(
      (station) => station.station_description === e.target.value
    );

    setAlert({
      ...alert,
      station: {
        ...alert.station,
        id_station: selectedStation ? selectedStation.id_station : "",
        station_description: e.target.value,
        location: {
          ...alert.station.location,
          id_location: selectedStation
            ? selectedStation.location.id_location
            : "",
          location_name: selectedStation
            ? selectedStation.location.location_name
            : "",
          latitude: selectedStation ? selectedStation.latitude : "",
          longitude: selectedStation ? selectedStation.longitude : "",
        },
      },
      parameter_type: {
        ...alert.parameter_type,
      },
    });
  };

  const handleParameterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedParameter = parameterType.find(
      (parameter) => parameter.description === e.target.value
    );

    setAlert({
      ...alert,
      station: {
        ...alert.station,
      },
      parameter_type: {
        ...alert.parameter_type,
        id_parameter_type: selectedParameter
          ? selectedParameter.id_parameter_type
          : "",
        description: e.target.value,
        factor: selectedParameter ? selectedParameter.factor : "",
        offset: selectedParameter ? selectedParameter.offset : "",
        unit: {
          ...alert.parameter_type.unit,
          id_unit: selectedParameter ? selectedParameter?.unitIdUnit : "",
          unit: selectedParameter ? selectedParameter?.unit : "",
        },
      },
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      console.log(alert);
      await window.stations3001.put(`alert/${alertId}`, alert);
      setToastMessage("Parâmetro da estação atualizado com sucesso!");
      setToast(true);
      updateAlertList();
    } catch (error) {
      console.error("Erro ao atualizar o parâmetro da estação:", error);
      setToastMessage("Erro ao atualizar o parâmetro da estação.");
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
        <h2 className="mb-3">Atualização de Alerta</h2>
        <form>
          <div className="mb-2">
            <label htmlFor="description" className="form-label">
              Descrição do Alerta:
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={alert.description}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="nome" className="form-label">
              Estação:
            </label>
            <select
              name="location_name"
              value={alert.station.station_description}
              onChange={handleStationChange}
              className="form-control"
            >
              <option value="">Selecione uma estação</option>
              {(Array.isArray(station) ? station : []).map((station) => (
                <option
                  key={station.id_station}
                  value={station.station_description}
                >
                  {station.station_description}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-2">
            <label htmlFor="email" className="form-label">
              Tipo de Parâmetro:
            </label>
            <select
              name="location_name"
              value={alert.parameter_type.description}
              onChange={handleParameterChange}
              className="form-control"
            >
              <option value="">Selecione um parâmetro de estação</option>
              {(Array.isArray(parameterType) ? parameterType : []).map(
                (parameterType) => (
                  <option
                    key={parameterType.id_parameter_type}
                    value={parameterType.description}
                  >
                    {parameterType.description}
                  </option>
                )
              )}
            </select>
          </div>
          <div className="mb-2">
            <label htmlFor="email" className="form-label">
              Na unidades de medida:
            </label>
            <select
              name="location_name"
              value={alert.parameter_type.unit.unit}
              className="form-control"
              disabled={true}
            >
              <option value="">Unidade de medida</option>
              {(Array.isArray(parameterType) ? parameterType : []).map(
                (parameterType) => (
                  <option
                    key={parameterType.id_parameter_type}
                    value={parameterType.unit}
                  >
                    {parameterType.unit}
                  </option>
                )
              )}
            </select>
          </div>
          <div className="mb-2">
            <label htmlFor="condition" className="form-label">
              Quando for:
            </label>
            <select
              type="text"
              name="condition"
              value={alert.condition}
              onChange={handleChange}
              className="form-control"
              required
            >
              <option value="">Selecione a condição</option>
              <option value="Igual a">Igual a</option>
              <option value="Maior que">Maior que</option>
              <option value="Maior ou Igual a">Maior ou Igual a</option>
              <option value="Maior que">Menor que</option>
              <option value="Menor ou Igual a">Menor ou Igual a</option>
            </select>
          </div>
          <div className="mb-2">
            <label htmlFor="value" className="form-label">
              Valor:
            </label>
            <input
              type="number"
              id="value"
              name="value"
              value={alert.value}
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
