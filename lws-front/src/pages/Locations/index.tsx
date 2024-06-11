import BodyHeader from "../../components/BodyHeader";
import { SetStateAction, useEffect, useState } from "react";
import LocationCreate from "../../components/Location/LocationCreate";
import LocationRead from "../../components/Location/LocationRead";
import LocationUpdate from "../../components/Location/LocationUpdate";
import Maps from "../../components/Maps";

const navigation = [
  { link: "#listar", title: "Listar" },
  { link: "#cadastrar", title: "Cadastrar" },
  { link: "#editar", title: "Editar" },
];

export default function Location() {
  const [locationUpdateId, setLocationUpdateIdId] = useState(null);
  const [location, setLocation] = useState([]);
  const [reload, setReload] = useState(false);

  const handleReload = () => {
    setReload(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await window.stations3001.get("locations");
        setLocation(response.data);
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    };
    fetchData();
  }, [reload]); // Este efeito será executado apenas uma vez, no momento da montagem do componente

  const handleEditarLocation = (id: SetStateAction<null>) => {
    // Define o ID do usuário que está sendo editado
    setLocationUpdateIdId(id);

    // Ativa a aba de edição
    const element = document.getElementById("Editar");
    if (element) {
      element.click();
    }
  };

  const updateLocationList = async () => {
    try {
      const response = await window.stations3001.get("location");
      setLocation(response.data);
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
              <LocationRead
                locationList={location}
                onEditLocation={handleEditarLocation}
                reload={handleReload}
              />
            </div>

            <div className="maps">
              <Maps
                data={location}
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
          <LocationCreate
            updateLocationList={updateLocationList}
            reload={handleReload}
          />
        </div>

        {/* Edição de Estações */}
        <div className="tab-pane" id="editar" role="tabpanel">
          <LocationUpdate
            locationId={locationUpdateId}
            updateLocationList={updateLocationList}
            reload={handleReload}
          />
        </div>
      </div>
    </>
  );
}
