import { useState, useEffect } from "react";
import Toast from "../../Toast";

export default function ParamsCreate({
  userList,
  onEditUser,
}: ParamsReadProps) {
  const [toast, setToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const [station, setStation] = useState({
    station_description: "",
    location: {
      location_name: "",
      coordinate: ""
    }
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

  const[stationParameter, setStationParameter] = useState({
  station: {
    id_station: "",
    station_description: "",
    location: {
      id_location: "",
      location_name: "",
      coordinate: ""
    }
  },
  parameter_type: {
    id_parameter_type: "",
    description: "",
    factor: "",
    offset: "",
    unit: {
      id_unit: "",
      unit: ""
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
  }, []);

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleStationParameterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedStation = station.find(station => station.station_description === e.target.value);
    const selectedParameter = parameterType.find(parameter => parameter.description === e.target.value);

    setStationParameter({
      ...stationParameter,
      station: {
        ...stationParameter.station,
        id_station: selectedStation ? selectedStation.id_station : '',
        station_description: e.target.value,
        location: {
          ...stationParameter.station.location,
        }
      },
      parameter_type: {
        ...stationParameter.parameter_type,
        id_parameter_type: selectedParameter ? selectedParameter.id_parameter_type : '',
        description: e.target.value,
        unit: {
          ...stationParameter.parameter_type.unit,
        }
      }
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      await window.stations3001.post("stationParameter", stationParameter);

      setToastMessage(`Parâmetro cadastrada com sucesso!`);
      setToast(true);

      setStation({
        station_description: "",
        location: {
          location_name: "",
          coordinate: ""
        }
      });

      setParameterType({
        description: "",
        factor: "",
        offset: "",
        unit: {
          id_unit: "",
          unit: ""
        }
      })

      setStationParameter({
        station: {
          id_station: "",
          station_description: "",
          location: {
            id_location: "",
            location_name: "",
            coordinate: ""
          }
        },
        parameter_type: {
          id_parameter_type: "",
          description: "",
          factor: "",
          offset: "",
          unit: {
            id_unit: "",
            unit: ""
          }
        }
      });

      updateUserList();
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
              onChange={handleStationParameterChange}
              className="form-control"
            >
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
              onChange={handleStationParameterChange}
              className="form-control"
            >
              {(Array.isArray(parameterType) ? parameterType : []).map((parameterType) => (
                <option key={parameterType.id_parameter_type} value={parameterType.description}>
                  {parameterType.description}
                </option>
              ))}
            </select>
          </div>

          <input type="hidden" name="role" value="user" />

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
