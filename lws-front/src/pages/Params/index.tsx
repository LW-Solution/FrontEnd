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
  const [reload, setReload] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (reload) {
          const response = await window.stations3001.get("stationParameter");
          setStationParameter(response.data);
          setReload(false);
        }
       
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    };
    fetchData();
  }, [reload]); // Este efeito será executado apenas uma vez, no momento da montagem do componente


  const handleReload = () => {
    setReload(true);
  }

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
          <ParamsRead stationParameterList={stationParameter} onEditStationParameter={handleEditarStationParameter} reload={handleReload}/>          
        </div>       

        {/* Cadastro de Usuário */}
        <div className="tab-pane" id="unidades" role="tabpanel">
          <ParamsUnidades updateParamsList={updateStationParameterList} reload={handleReload} />
        </div>

        <div className="tab-pane" id="tipo" role="tabpanel">
          <ParamsTipo updateParamsList={updateStationParameterList} reload={handleReload}/>
        </div>

        {/* Cadastro de Usuário */}
        <div className="tab-pane" id="cadastrar" role="tabpanel">
          <ParamsCreate updateStationParameterList={updateStationParameterList} reload={handleReload} />
        </div>

        {/* Edição de Usuário */}
        
        <div className="tab-pane" id="editar" role="tabpanel">
          <ParamsUpdate
            stationParameterId={stationParameterUpdateId}            
            updateStationParameterList={updateStationParameterList}
            reload={handleReload}
          />
        </div>        
      </div>
    </>
  );
}
