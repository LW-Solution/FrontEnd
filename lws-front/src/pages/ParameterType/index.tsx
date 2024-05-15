import BodyHeader from "../../components/BodyHeader";
import { SetStateAction, useEffect, useState } from "react";
import ParameterTypeCreate from "../../components/ParameterType/ParameterTypeCreate";
import ParameterTypeRead from "../../components/ParameterType/ParameterTypeRead";
/* import ParameterTypeUpdate from "../../components/ParameterType/ParameterTypeUpdate"; */

const navigation = [
  { link: "#listar", title: "Listar" },
  { link: "#cadastrar", title: "Cadastrar" },
  { link: "#editar", title: "Editar" },
];

export default function ParameterType() {
  const [parameterTypeUpdateId, setParameterTypeUpdateIdId] = useState(null);
  const [parameterType, setParameterType] = useState([]);
  const [reload, setReload] = useState(false);

  const handleReload = () => {
    setReload(true);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await window.stations3001.get("parameterType");
        setParameterType(response.data);
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    };
    fetchData();
  }, [reload]); // Este efeito será executado apenas uma vez, no momento da montagem do componente

  const handleEditarParameterType = (id: SetStateAction<null>) => {
    // Define o ID do usuário que está sendo editado
    setParameterTypeUpdateIdId(id);

    // Ativa a aba de edição
    const element = document.getElementById("Editar");
    if (element) {
      element.click();
    }
  };


  const updateParameterTypeList = async () => {
    try {
      const response = await window.stations3001.get("parameterType");
      setParameterType(response.data);
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
          <ParameterTypeRead parameterTypeList={parameterType} onEditParameterType={handleEditarParameterType} reload={handleReload} />
        </div>

        {/* Cadastro de Estações */}
        <div className="tab-pane" id="cadastrar" role="tabpanel">
          <ParameterTypeCreate updateParameterTypeList={updateParameterTypeList}  reload={handleReload} />
        </div>

        {/* Edição de Estações */}
        {/* <div className="tab-pane" id="editar" role="tabpanel">
          <ParameterTypeUpdate
            stationId={parameterTypeUpdateId}
            updateParameterTypeList={updateParameterTypeList}
            reload={handleReload}
          />
        </div> */}
      </div>
    </>
  );
}
