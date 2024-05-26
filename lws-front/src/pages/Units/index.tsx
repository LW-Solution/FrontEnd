import BodyHeader from "../../components/BodyHeader";
import { SetStateAction, useEffect, useState } from "react";
import UnitCreate from "../../components/Unit/UnitCreate";
import UnitRead from "../../components/Unit/UnitRead";
import UnitUpdate from "../../components/Unit/UnitUpdate";

const navigation = [
  { link: "#listar", title: "Listar" },
  { link: "#cadastrar", title: "Cadastrar" },
  { link: "#editar", title: "Editar" },
];

export default function Unit() {
  const [unitUpdateId, setUnitUpdateIdId] = useState(null);
  const [unit, setUnit] = useState([]);
  const [reload, setReload] = useState(false);

  const handleReload = () => {
    setReload(true);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await window.stations3001.get("unit");
        setUnit(response.data);
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    };
    fetchData();
  }, [reload]); // Este efeito será executado apenas uma vez, no momento da montagem do componente

  const handleEditarUnit = (id: SetStateAction<null>) => {
    // Define o ID do usuário que está sendo editado
    setUnitUpdateIdId(id);

    // Ativa a aba de edição
    const element = document.getElementById("Editar");
    if (element) {
      element.click();
    }
  };


  const updateUnitList = async () => {
    try {
      const response = await window.stations3001.get("unit");
      setUnit(response.data);
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
          <UnitRead unitList={unit} onEditUnit={handleEditarUnit} reload={handleReload} />
        </div>

        {/* Cadastro de Estações */}
        <div className="tab-pane" id="cadastrar" role="tabpanel">
          <UnitCreate updateUnitList={updateUnitList}  reload={handleReload} />
        </div>

        {/* Edição de Estações */}
        <div className="tab-pane" id="editar" role="tabpanel">
          <UnitUpdate
            unitId={unitUpdateId}
            updateUnitList={updateUnitList}
            reload={handleReload}
          />
        </div>
      </div>
    </>
  );
}
