import { useState, useEffect, SetStateAction } from "react";
import "./style.scss";
import Modal from "../../Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Toast from "../../Toast";

export default function ParamsRead({
  stationParameterList,
  onEditStationParameter,
}: {
  stationParameterList: never[];
  onEditStationParameter: (id_station_parameter: SetStateAction<null>) => void;
}) {
  const [toast, setToast] = useState(false);
  const [stationParameter, setStationParameter] = useState([]);

  useEffect(() => {
    if (Array.isArray(stationParameterList)) {
      setStationParameter(stationParameterList);
    }
  }, [stationParameterList]);

  const [modalData, setModalData] = useState({
    showModal: false,
    stationParameterIdToDelete: null,
    stationParameterToDelete: null,
    stationParameterEmailToDelete: null,
  });
  const [deleteStatus, setDeleteStatus] = useState(null);

  const handleEdit = (id_station_parameter: SetStateAction<null>) => {
    onEditStationParameter && onEditStationParameter(id_station_parameter);
  };
  const cancelDelete = () => {
    setModalData({
      showModal: false,
      stationParameterIdToDelete: null,
      stationParameterToDelete: null,
      stationParameterEmailToDelete: null,
    });
    setDeleteStatus(null); // Resetar o status ao cancelar
  };

  const handleDelete = (id_station_parameter: number, nome: string, email: string) => {
    setModalData({
      showModal: true,
      stationParameterIdToDelete: id_station_parameter,
      stationParameterToDelete: nome,
      stationParameterEmailToDelete: email,
    });
    setDeleteStatus(null); // Resetar o status ao abrir o modal
  };

  const confirmDelete = async (id_station_parameter: number) => {
    try {
      // Realizar a solicitação DELETE
      const response = await window.stations3001.delete(
        `stationParameter/${id_station_parameter ? String(id_station_parameter) : ""}`
      );
      if (response.status === 200) {
        setStationParameter(
          stationParameter.filter(
            (stationParameter: { id_station_parameter: number }) => stationParameter.id_station_parameter !== id_station_parameter
          )
        );
      }

      // Atualizar o status para sucesso
      setDeleteStatus("success");

      // Feche o modal após a exclusão ou faça outras ações necessárias
      setModalData({
        showModal: true,
        stationParameterIdToDelete: null,
        stationParameterToDelete: null,
        stationParameterEmailToDelete: null,
      });

      // Atualizar a lista de usuários após a exclusão, se necessário
      const updatedParamss = stationParameter.filter(
        (stationParameter) => stationParameter.id_station_parameter !== id_station_parameter
      );
      setStationParameter(updatedParamss);
    } catch (error) {
      console.error("Erro ao excluir o usuário:", error);

      setModalData({
        showModal: true,
        stationParameterIdToDelete: null,
        stationParameterToDelete: null,
        stationParameterEmailToDelete: null,
      });

      // Atualizar o status para falha
      setDeleteStatus("fail");
    }
  };

  const modalContent =
    deleteStatus === "success" ? (
      <p>Estação excluída com sucesso!</p>
    ) : deleteStatus === "fail" ? (
      <p>Falha ao excluir a estação. Tente novamente mais tarde.</p>
    ) : (
      <>
        <div className="text-center">
          <p className="confirmation-message">
            Deseja realmente excluir a estação?
          </p>
        </div>
        <div className="stationParameter-details">
          <p>
            <b>ID: </b>
            {modalData.stationParameterIdToDelete}
          </p>
          <p>
            <b>Descrição: </b>
            {modalData.stationParameterToDelete}
          </p>
          <p>
            <b>Local: </b>
            {modalData.stationParameterEmailToDelete}
          </p>
        </div>
      </>
    );

  return (
    <div>
      <Toast show={toast} toggle={setToast} children={undefined} />
      <h2 className="my-3">Parâmetros Cadastrados em Estações</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Estação</th>
            <th>Descrição</th>
            <th>Unid. Medida</th>
            <th>Fator</th>
            <th>Offset</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {stationParameter.map(
            (stationParameter: {
              station_parameter_id: number;
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
              <tr key={stationParameter?.station_parameter_id}>
                <td>{stationParameter?.station?.station_description}</td>
                <td>{stationParameter?.parameter_type?.description}</td>
                <td>{stationParameter?.parameter_type?.unit?.unit}</td>
                <td>{stationParameter?.parameter_type?.factor}</td>
                <td>{stationParameter?.parameter_type?.offset}</td>
                <td>
                  {/* Ícone de Editar */}
                  <FontAwesomeIcon
                    icon={faEdit}
                    className="btn btn-secondary me-1"
                    onClick={() =>
                      handleEdit(
                        stationParameter?.station_parameter_id as unknown as SetStateAction<null>
                      )
                    }
                  />
                  {/* Ícone de Excluir */}
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="btn btn-danger"
                    onClick={
                      () =>
                        handleDelete(stationParameter?.station_parameter_id, stationParameter.station.station_description, stationParameter.parameter_type.description) // Substituído 'stationParameter' por 'fakeData' e 'stationParameter_name' e 'email' por 'name' e 'type'
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
                    modalData.stationParameterIdToDelete !== null &&
                    confirmDelete(modalData.stationParameterIdToDelete)
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
