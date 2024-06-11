import BodyHeader from "../../components/BodyHeader";
import { SetStateAction, useEffect, useState } from "react";
import StationsCreate from "../../components/Stations/StationsCreate";
import StationsRead from "../../components/Stations/StationsRead";
import StationsUpdate from "../../components/Stations/StationsUpdate";
import Maps from "../../components/Maps";
import "./style.scss";

const navigation = [
  { link: "#listar", title: "Listar" },
  { link: "#cadastrar", title: "Estações" },
  { link: "#editar", title: "Editar" },
];

export default function Stations() {
  const [stationUpdateId, setstationUpdateIdId] = useState(null);
  const [station, setStation] = useState([]);
  const [reload, setReload] = useState(false);

  const handleReload = () => {
    setReload(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await window.stations3001.get("station");
        setStation(response.data);
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    };
    fetchData();
  }, [reload]); // Este efeito será executado apenas uma vez, no momento da montagem do componente

  const handleEditarUsuario = (id: SetStateAction<null>) => {
    // Define o ID do usuário que está sendo editado
    setstationUpdateIdId(id);

    // Ativa a aba de edição
    const element = document.getElementById("Editar");
    if (element) {
      element.click();
    }
  };

  const updateStationList = async () => {
    try {
      const response = await window.stations3001.get("station");
      setStation(response.data);
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  return (
    <>
      <BodyHeader navigation={navigation} />
      <div className="my-3 tab-content">
        {/* Listagem de Estações */}
        <div className="tab-pane active" id="listar" role="tabpanel">
          <div style={{ display: "flex" }}>
            <div style={{ flex: 1 }}>
              <StationsRead
                stationList={station}
                onEditStation={handleEditarUsuario}
                reload={handleReload}
              />
            </div>
            <div className="maps">
              <Maps
                data={station}
                getCoordinates={(item) => {
                  if ("location" in item) {
                    return {
                      latitude: item.location.latitude,
                      longitude: item.location.longitude,
                    };
                  } else {
                    return {
                      latitude: item.latitude,
                      longitude: item.longitude,
                    };
                  }
                }}
              />{" "}
            </div>
          </div>
        </div>

        {/* Cadastro de Estações */}
        <div className="tab-pane" id="cadastrar" role="tabpanel">
          <StationsCreate
            updateStationList={updateStationList}
            reload={handleReload}
          />
        </div>

        {/* Edição de Estações */}
        <div className="tab-pane" id="editar" role="tabpanel">
          <StationsUpdate
            stationId={stationUpdateId}
            updateStationList={updateStationList}
            reload={handleReload}
          />
        </div>
      </div>
    </>
  );
}
