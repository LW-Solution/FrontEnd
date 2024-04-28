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
  const [paramsUpdateId, setParamsUpdateId] = useState(null);
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
  }, []); // Este efeito será executado apenas uma vez, no momento da montagem do componente

  const handleEditarUsuario = (id: SetStateAction<null>) => {
    // Define o ID do usuário que está sendo editado
    setParamsUpdateId(id);

    // Ativa a aba de edição
    const element = document.getElementById("Editar");
    if (element) {
      element.click();
    }    
  };
  
  const updateParamsList = async () => {
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
          <ParamsRead paramsList={stationParameter} onEditParams={handleEditarUsuario}/>          
        </div>       

        {/* Cadastro de Usuário */}
        <div className="tab-pane" id="unidades" role="tabpanel">
          <ParamsUnidades updateParamsList={updateParamsList} />
        </div>

        <div className="tab-pane" id="tipo" role="tabpanel">
          <ParamsTipo updateParamsList={updateParamsList} />
        </div>

        {/* Cadastro de Usuário */}
        <div className="tab-pane" id="cadastrar" role="tabpanel">
          <ParamsCreate updateParamsList={updateParamsList} />
        </div>

        {/* Edição de Usuário */}
        
        <div className="tab-pane" id="editar" role="tabpanel">
          <ParamsUpdate
            usuarioId={paramsUpdateId}            
            updateParamsList={updateParamsList}
          />
        </div>        
      </div>
    </>
  );
}
