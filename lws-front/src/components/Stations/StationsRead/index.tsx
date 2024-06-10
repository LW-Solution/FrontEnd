import { useState, useEffect, SetStateAction } from "react";
import "./style.scss";
import Modal from "../../Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";
import Toast from "../../Toast";
import { useNavigate } from "react-router-dom";

export default function StationsRead({
  stationList,
  onEditStation,
  reload,
}: {
  stationList: never[];
    onEditStation: (id_station: SetStateAction<null>) => void;
    reload: () => void;
}) {
  const [toast, setToast] = useState(false);
  const [station, setStation] = useState([]);

  useEffect(() => {
    if (Array.isArray(stationList)) {
      setStation(stationList);
    }
  }, [reload, stationList]);

  const [modalData, setModalData] = useState({
    showModal: false,
    stationIdToDelete: null,
    stationToDelete: null,
    stationEmailToDelete: null,
  });
  const [deleteStatus, setDeleteStatus] = useState(null);

  const handleEdit = (id_station: SetStateAction<null>) => {
    onEditStation && onEditStation(id_station);
  };
  const cancelDelete = () => {
    setModalData({
      showModal: false,
      stationIdToDelete: null,
      stationToDelete: null,
      stationEmailToDelete: null,
    });
    setDeleteStatus(null); // Resetar o status ao cancelar
  };

  const handleDelete = (id_station: number, nome: string, email: string) => {
    setModalData({
      showModal: true,
      stationIdToDelete: id_station,
      stationToDelete: nome,
      stationEmailToDelete: email,
    });
    setDeleteStatus(null); // Resetar o status ao abrir o modal
    reload();
  };

  const confirmDelete = async (id_station: number) => {
    try {
      // Realizar a solicitação DELETE
      const response = await window.stations3001.delete(
        `station/${id_station ? String(id_station) : ""}`
      );
      if (response.status === 200) {
        setStation(
          station.filter(
            (station: { id_station: number }) =>
              station.id_station !== id_station
          )
        );
      }

      // Atualizar o status para sucesso
      setDeleteStatus("success");

      // Feche o modal após a exclusão ou faça outras ações necessárias
      setModalData({
        showModal: true,
        stationIdToDelete: null,
        stationToDelete: null,
        stationEmailToDelete: null,
      });

      // Atualizar a lista de usuários após a exclusão, se necessário
      const updatedStations = station.filter(
        (station) => station.id_station !== id_station
      );
      setStation(updatedStations);
      reload();
    } catch (error) {
      console.error("Erro ao excluir o usuário:", error);

      setModalData({
        showModal: true,
        stationIdToDelete: null,
        stationToDelete: null,
        stationEmailToDelete: null,
      });

      // Atualizar o status para falha
      setDeleteStatus("fail");
    }
  };

  const navigate = useNavigate();

  const handleChartClick = (id_station: number) => {
    navigate(`/admin/dashboard/${id_station}`);
  };

  const modalContent =
    deleteStatus === "success" ? (
      <p>Estação excluída com sucesso!</p>
    ) : deleteStatus === "fail" ? (
      <p>Falha ao excluir a Estação. Tente novamente mais tarde.</p>
    ) : (
      <>
        <div className="text-center">
          <p className="confirmation-message">
            Deseja realmente excluir esta Estação?
          </p>
        </div>
        <div className="station-details">
          <p>
            <b>ID: </b>
            {modalData.stationIdToDelete}
          </p>
          <p>
            <b>Estação: </b>
            {modalData.stationToDelete}
          </p>
          <p>
            <b>Localização: </b>
            {modalData.stationEmailToDelete}
          </p>
        </div>
      </>
    );

  return (
    <div>
      <Toast show={toast} toggle={setToast} children={undefined} />
      <h2 className="my-3">Estações Cadastradas</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Descrição da Estação</th>
            <th>Localização</th>           
            <th className="text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {station.map(
            (station: {
              id_station: number;
              station_description: string;
              location: {
                location_name: string;
                latitude: string;
                longitude: string;
              };
            }) => (
              <tr key={station.id_station}>
                <td >{station.station_description}</td>
                <td >{station?.location?.location_name}</td>               
                <td className="text-center">
                  {/* Ícone de Editar */}
                  <FontAwesomeIcon
                    icon={faEdit}
                    className="btn btn-sm btn-secondary me-1"
                    onClick={() =>
                      handleEdit(
                        station.id_station as unknown as SetStateAction<null>
                      )
                    }
                  />
                  {/* Ícone de Excluir */}
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="btn btn-sm btn-danger me-1"
                    onClick={() =>
                      handleDelete(
                        station.id_station,
                        station.station_description,
                        station.location.location_name
                      )
                    }
                  />
                  <FontAwesomeIcon
                    icon={faChartLine}
                    className="btn btn-sm btn-primary"
                    onClick={() => handleChartClick(station.id_station)}
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
                    modalData.stationIdToDelete !== null &&
                    confirmDelete(modalData.stationIdToDelete)
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
