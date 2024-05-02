import { useState, useEffect } from "react";
import Toast from "../../Toast";

export default function ParamsCreate({
  updateStationParameterList,
}: {
  updateStationParameterList: () => Promise<void>;
}) {
  const [toast, setToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const [station, setStation] = useState({
    station_description: "",
    location: {
      location_name: "",
      latitude: "",
      longitude: "",
    }
  });

  const [parameterType, setParameterType] = useState({
    description: "",
    factor: "",
    offset: "",
    unit: {
      id_unit: "",
    },
  });

  const[stationParameter, setStationParameter] = useState({
  station: {
    id_station: "",
    station_description: "",
    location: {
      id_location: "",
      location_name: "",
      latitude: "",
      longitude: "",
    }
  },
  parameter_type: {
    id_parameter_type: "",
    description: "",
    factor: "",
    offset: "",
    unit: {
      id_unit: "",
    }
  }
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
  }, [stationParameter]);

  /* const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setStation((prevStation) => ({
      ...prevStation,
      [name]: value,
    }));
  }; */

  const handleStationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedStation = station.find(station => station.station_description === e.target.value);

    setStationParameter({
      ...stationParameter,
      station: {
        ...stationParameter.station,
        id_station: selectedStation ? selectedStation.id_station : '',
        station_description: e.target.value,
        location: {
          ...stationParameter.station.location,
          id_location: selectedStation ? selectedStation.location.id_location : '',
          location_name: selectedStation ? selectedStation.location.location_name : '',
          latitude: selectedStation ? selectedStation.latitude : "",
          longitude: selectedStation ? selectedStation.longitude : "",
        }
      },
      parameter_type: {
        ...stationParameter.parameter_type,
      }
    });
  };

  const handleParameterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedParameter = parameterType.find(parameter => parameter.description === e.target.value);

    setStationParameter({
      ...stationParameter,
      station: {
        ...stationParameter.station,
      },
      parameter_type: {
        ...stationParameter.parameter_type,
        id_parameter_type: selectedParameter ? selectedParameter.id_parameter_type : '',
        description: e.target.value,
        factor: selectedParameter ? selectedParameter.factor : '',
        offset: selectedParameter ? selectedParameter.offset : '',
        unit: {
          ...stationParameter.parameter_type.unit,
          id_unit: selectedParameter ? selectedParameter?.unitIdUnit : '',
        }
      }
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const resposta = await window.stations3001.post("stationParameter", stationParameter);

      setToastMessage(`Parâmetro cadastrado na estação!`);
      setToast(true);

      setStation({
        station_description: "",
        location: {
          location_name: "",
          latitude: "",
          longitude: "",
        }
      });

      setParameterType({
        description: "",
        factor: "",
        offset: "",
        unit: {
          id_unit: "",
        }
      })

      setStationParameter({
        station: {
          id_station: "",
          station_description: "",
          location: {
            id_location: "",
            location_name: "",
            latitude: "",
            longitude: "",
          }
        },
        parameter_type: {
          id_parameter_type: "",
          description: "",
          factor: "",
          offset: "",
          unit: {
            id_unit: "",
          }
        }
      });

      updateStationParameterList();
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
        <h2 className="mb-3">Cadastro de Parâmetros em Estação</h2>
        <form>
          <div className="mb-2">
            <label htmlFor="nome" className="form-label">
              Estação:
            </label>
            <select
              name="location_name"
              value={stationParameter.station.station_description}
              onChange={handleStationChange}
              className="form-control"
            >
              <option value="">Selecione uma estação</option>
              {(Array.isArray(station) ? station : []).map((station) => (
                <option key={station.id_station} value={station.station_description}>
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
              value={stationParameter.parameter_type.description}
              onChange={handleParameterChange}
              className="form-control"
            >
              <option value="">Selecione um parâmetro de estação</option>
              {(Array.isArray(parameterType) ? parameterType : []).map((parameterType) => (
                <option key={parameterType.id_parameter_type} value={parameterType.description}>
                  {parameterType.description}
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
