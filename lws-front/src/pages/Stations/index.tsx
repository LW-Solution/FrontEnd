import BodyHeader from "../../components/BodyHeader";
import { SetStateAction, useEffect, useState } from "react";
import StationsCreate from "../../components/Stations/StationsCreate";
import StationsRead from "../../components/Stations/StationsRead";
import StationsUpdate from "../../components/Stations/StationsUpdate";
import StationsLocalizacao from "../../components/Stations/StationsLocalizacao";

const navigation = [
  { link: "#listar", title: "Listar" },
  { link: "#cadastrar", title: "Estações" },
  { link: "#localizacao", title: "Localização" },
  { link: "#editar", title: "Editar" },
];

export default function Stations() {
  const [stationUpdateId, setstationUpdateIdId] = useState(null);
  const [station, setStation] = useState([]);

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
  }, [station]); // Este efeito será executado apenas uma vez, no momento da montagem do componente

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
      <BodyHeader navigation={navigation}/>
      <div className="my-3 tab-content">
        {/* Listagem de Estações */}
        <div className="tab-pane active" id="listar" role="tabpanel">
          <StationsRead stationList={station} onEditStation={handleEditarUsuario}/>          
        </div> 

        {/* Cadastro de Estações */}
        <div className="tab-pane" id="localizacao" role="tabpanel">
          <StationsLocalizacao updateStationList={updateStationList} />
        </div>      

        {/* Cadastro de Estações */}
        <div className="tab-pane" id="cadastrar" role="tabpanel">
          <StationsCreate updateStationList={updateStationList} />
        </div>

        {/* Edição de Estações */}        
        <div className="tab-pane" id="editar" role="tabpanel">
          <StationsUpdate
            stationId={stationUpdateId}            
            updateStationList={updateStationList}
          />
        </div>        
      </div>
    </>
  );
}
