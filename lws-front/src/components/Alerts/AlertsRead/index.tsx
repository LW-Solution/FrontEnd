import { useState, useEffect, SetStateAction } from "react";
import Modal from "../../Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Toast from "../../Toast";

export default function AlertsRead({
  alertList,
  onEditAlert,
}: {
  alertList: never[];
  onEditAlert: (id_alert: SetStateAction<null>) => void;
}) {
  const [toast, setToast] = useState(false);
  const [alert, setAlert] = useState([]);

  useEffect(() => {
    if (Array.isArray(alertList)) {
      setAlert(alertList);
    }
  }, [alertList]);

  const [modalData, setModalData] = useState({
    showModal: false,
    alertIdToDelete: null,
    alertToDelete: null,
    alertEmailToDelete: null,
  });
  const [deleteStatus, setDeleteStatus] = useState(null);

  const handleEdit = (id_alert: SetStateAction<null>) => {
    onEditAlert && onEditAlert(id_alert);
  };
  const cancelDelete = () => {
    setModalData({
      showModal: false,
      alertIdToDelete: null,
      alertToDelete: null,
      alertEmailToDelete: null,
    });
    setDeleteStatus(null); // Resetar o status ao cancelar
  };

  const handleDelete = (id_alert: number, nome: string, email: string) => {
    setModalData({
      showModal: true,
      alertIdToDelete: id_alert,
      alertToDelete: nome,
      alertEmailToDelete: email,
    });
    setDeleteStatus(null); // Resetar o status ao abrir o modal
  };

  const confirmDelete = async (id_alert: number) => {
    try {
      // Realizar a solicitação DELETE
      const response = await window.stations3001.delete(
        `alert/${id_alert ? String(id_alert) : ""}`
      );
      if (response.status === 200) {
        setAlert(
          alert.filter(
            (alert: { id_alert: number }) => alert.id_alert !== id_alert
          )
        );
      }

      // Atualizar o status para sucesso
      setDeleteStatus("success");

      // Feche o modal após a exclusão ou faça outras ações necessárias
      setModalData({
        showModal: true,
        alertIdToDelete: null,
        alertToDelete: null,
        alertEmailToDelete: null,
      });

      // Atualizar a lista de usuários após a exclusão, se necessário
      const updatedParamss = alert.filter(
        (alert) => alert.id_alert !== id_alert
      );
      setAlert(updatedParamss);
    } catch (error) {
      console.error("Erro ao excluir o usuário:", error);

      setModalData({
        showModal: true,
        alertIdToDelete: null,
        alertToDelete: null,
        alertEmailToDelete: null,
      });

      // Atualizar o status para falha
      setDeleteStatus("fail");
    }
  };

  const modalContent =
    deleteStatus === "success" ? (
      <p>Estação excluída com sucesso!</p>
    ) : deleteStatus === "fail" ? (
      <p>Falha ao excluir o alerta. Tente novamente mais tarde.</p>
    ) : (
      <>
        <div className="text-center">
          <p className="confirmation-message">
            Deseja realmente excluir o alerta?
          </p>
        </div>
        <div className="alert-details">
          <p>
            <b>ID: </b>
            {modalData.alertIdToDelete}
          </p>
          <p>
            <b>Descrição: </b>
            {modalData.alertToDelete}
          </p>
          <p>
            <b>Local: </b>
            {modalData.alertEmailToDelete}
          </p>
        </div>
      </>
    );

  return (
    <div>
      <Toast show={toast} toggle={setToast} children={undefined} />
      <h2 className="my-3">Alertas Cadastrados</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Estação</th>
            <th>Descrição</th>
            <th>Condição</th>
            <th>Valor</th>
            <th>Unidade</th>
            <th className="text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {alert.map(
            (alert: {
              id_alert: number;
              condition: string;
              description: string;
              value: number;
              station: {
                id_station: number;
                station_description: string;
                location: {
                  id_location: number;
                  location_name: string;
                  latitude: string;
                  longitude: string;
                };
              };
              parameter_type: {
                id_parameter_type: number;
                description: string;
                factor: number;
                offset: number;
                unit: {
                  id_unit: number;
                  unit: string;
                };
              };
            }) => (
              <tr key={alert?.id_alert}>
                <td className="col-3">{alert?.station?.station_description}</td>
                <td className="col-2">{alert?.description}</td>
                <td className="col-2">{alert?.condition}</td>
                <td className="col-1">{alert?.value}</td>
                <td className="col-1">{alert?.parameter_type?.unit?.unit}</td>
                <td className="col-1 text-center">
                  {/* Ícone de Editar */}
                  <FontAwesomeIcon
                    icon={faEdit}
                    className="btn btn-sm btn-secondary me-1"
                    onClick={() =>
                      handleEdit(
                        alert?.id_alert as unknown as SetStateAction<null>
                      )
                    }
                  />
                  {/* Ícone de Excluir */}
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="btn btn-sm btn-danger"
                    onClick={
                      () =>
                        handleDelete(alert?.id_alert, alert?.station?.station_description, alert?.description) // Substituído 'alert' por 'fakeData' e 'alert_name' e 'email' por 'name' e 'type'
                    }
                  />
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
      <Modal
        showModal={modalData.showModal}
        handler={cancelDelete}
        footer={() => (
          <>
            {deleteStatus !== "success" && deleteStatus !== "fail" && (
              <>
                <button
                  className="btn btn-danger"
                  onClick={() =>
                    modalData.alertIdToDelete !== null &&
                    confirmDelete(modalData.alertIdToDelete)
                  }
                >
                  Excluir
                </button>
                <button className="btn btn-secondary" onClick={cancelDelete}>
                  Cancelar
                </button>
              </>
            )}
          </>
        )}
      >
        {modalContent}
      </Modal>
    </div>
  );
}
