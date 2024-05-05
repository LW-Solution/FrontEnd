import BodyHeader from "../../components/BodyHeader";
import { SetStateAction, useEffect, useState } from "react";
import ParamsRead from "../../components/Params/ParamsRead";
import ParamsCreate from "../../components/Params/ParamsCreate";
import ParamsUpdate from "../../components/Params/ParamsUpdate";
import ParamsUnidades from "../../components/Params/ParamsUnidades";
import ParamsTipo from "../../components/Params/ParamsTipo";

const navigation = [
  { link: "#listar", title: "Listar" },
  { link: "#cadastrar", title: "Cadastrar Parâmetro" },
  { link: "#unidades", title: "Unidades" },
  { link: "#tipo", title: "Tipo de Parâmetro" },
  { link: "#editar", title: "Editar" },
];

export default function Params() {
  const [stationParameterUpdateId, setStationParameterUpdateId] = useState(null);
  const [stationParameter, setStationParameter] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await window.stations3001.get("stationParameter");
        setStationParameter(response.data);
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    };
    fetchData();
  }, [stationParameter]); // Este efeito será executado apenas uma vez, no momento da montagem do componente

  const handleEditarStationParameter = (id: SetStateAction<null>) => {
    // Define o ID do usuário que está sendo editado
    setStationParameterUpdateId(id);
    // Ativa a aba de edição
    const element = document.getElementById("Editar");
    if (element) {
      element.click();
    }    
  };
  
  const updateStationParameterList = async () => {
    try {
      const response = await window.stations3001.get("stationParameter");
      setStationParameter(response.data);
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  return (
    <>

      <BodyHeader navigation={navigation}/>
      <div className="my-3 tab-content">
        {/* Listagem de Usuários */}
        <div className="tab-pane active" id="listar" role="tabpanel">
          <ParamsRead stationParameterList={stationParameter} onEditStationParameter={handleEditarStationParameter}/>          
        </div>       

        {/* Cadastro de Usuário */}
        <div className="tab-pane" id="unidades" role="tabpanel">
          <ParamsUnidades updateStationParameterList={updateStationParameterList} />
        </div>

        <div className="tab-pane" id="tipo" role="tabpanel">
          <ParamsTipo updateStationParameterList={updateStationParameterList} />
        </div>

        {/* Cadastro de Usuário */}
        <div className="tab-pane" id="cadastrar" role="tabpanel">
          <ParamsCreate updateStationParameterList={updateStationParameterList} />
        </div>

        {/* Edição de Usuário */}
        
        <div className="tab-pane" id="editar" role="tabpanel">
          <ParamsUpdate
            stationParameterId={stationParameterUpdateId}            
            updateStationParameterList={updateStationParameterList}
          />
        </div>        
      </div>
    </>
  );
}
