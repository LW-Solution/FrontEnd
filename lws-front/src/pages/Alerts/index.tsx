import BodyHeader from "../../components/BodyHeader";
import { SetStateAction, useEffect, useState } from "react";
import AlertsCreate from "../../components/Alerts/AlertsCreate";
import AlertsRead from "../../components/Alerts/AlertsRead";
import AlertsUpdate from "../../components/Alerts/AlertsUpdate";

const navigation = [
  { link: "#listar", title: "Listar" },
  { link: "#cadastrar", title: "Cadastrar" },
  { link: "#editar", title: "Editar" },
];

export default function Alerts() {
  const [alertUpdateId, setAlertUpdateId] = useState(null);
  const [alert, setAlert] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await window.stations3001.get("alert");
        setAlert(response.data);
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    };
    fetchData();
  }, []); // Este efeito será executado apenas uma vez, no momento da montagem do componente

  const handleEditarAlert = (id: SetStateAction<null>) => {
    // Define o ID do usuário que está sendo editado
    setAlertUpdateId(id);
    // Ativa a aba de edição
    const element = document.getElementById("Editar");
    if (element) {
      element.click();
    }
  };

  const updateAlertList = async () => {
    try {
      const response = await window.stations3001.get("alert");
      setAlert(response.data);
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  return (
    <>
      <BodyHeader navigation={navigation} />
      <div className="my-3 tab-content">
        {/* Cadastro de alertas */}
        <div className="tab-pane" id="cadastrar" role="tabpanel">
          <AlertsCreate updateAlertList={updateAlertList} />
        </div>

        {/* Listagem de alertas */}
        <div className="tab-pane active" id="listar" role="tabpanel">
          <AlertsRead alertList={alert} onEditAlert={handleEditarAlert} />
        </div>

        {/* Update de alertas */}
        <div className="tab-pane" id="editar" role="tabpanel">
          <AlertsUpdate
            alertId={alertUpdateId}
            updateAlertList={updateAlertList}
          />
        </div>
      </div>
    </>
  );
}
