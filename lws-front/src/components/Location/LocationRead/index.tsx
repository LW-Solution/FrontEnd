import { useState, useEffect, SetStateAction } from "react";
import "./style.scss";
import Modal from "../../Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Toast from "../../Toast";

export default function LocationsRead({
  locationList,
  onEditLocation,
  reload,
}: {
  locationList: never[];
  onEditLocation: (id_location: SetStateAction<null>) => void;
  reload: () => void;
}) {
  const [toast, setToast] = useState(false);
  const [location, setLocation] = useState([]);

  useEffect(() => {
    if (Array.isArray(locationList)) {
      setLocation(locationList);
    }
  }, [reload, locationList]);

  const [modalData, setModalData] = useState({
    showModal: false,
    locationIdToDelete: null,
    locationToDelete: null,
    locationLatitudeToDelete: null,
    locationLongitudeToDelete: null,
  });
  const [deleteStatus, setDeleteStatus] = useState(null);

  const handleEdit = (id_location: SetStateAction<null>) => {
    onEditLocation && onEditLocation(id_location);
  };
  const cancelDelete = () => {
    setModalData({
      showModal: false,
      locationIdToDelete: null,
      locationToDelete: null,
      locationLatitudeToDelete: null,
      locationLongitudeToDelete: null,
    });
    setDeleteStatus(null); // Resetar o status ao cancelar
  };

  const handleDelete = (
    id_location: number,
    nome: string,
    email: string
  ) => {
    setModalData({
      showModal: true,
      locationIdToDelete: id_location,
      locationToDelete: nome,
      locationLatitudeToDelete: email,
      locationLongitudeToDelete: email,
    });
    setDeleteStatus(null); // Resetar o status ao abrir o modal
    reload();
  };

  const confirmDelete = async (id_location: number) => {
    try {
      // Realizar a solicitação DELETE
      const response = await window.stations3001.delete(
        `locations/${id_location ? String(id_location) : ""}`
      );
      if (response.status === 200) {
        setLocation(
          location.filter(
            (location: { id_location: number }) =>
              location.id_location !== id_location
          )
        );
      }

      // Atualizar o status para sucesso
      setDeleteStatus("success");

      // Feche o modal após a exclusão ou faça outras ações necessárias
      setModalData({
        showModal: true,
        locationIdToDelete: null,
        locationToDelete: null,
        locationLatitudeToDelete: null,
        locationLongitudeToDelete: null,
      });

      // Atualizar a lista de usuários após a exclusão, se necessário
      const updatedLocations = location.filter(
        (location) =>
          location?.id_location !== id_location
      );
      setLocation(updatedLocations);
      reload();
    } catch (error) {
      console.error("Erro ao excluir o usuário:", error);

      setModalData({
        showModal: true,
        locationIdToDelete: null,
        locationToDelete: null,
        locationLatitudeToDelete: null,
        locationLongitudeToDelete: null,
      });

      // Atualizar o status para falha
      setDeleteStatus("fail");
    }
  };

  const modalContent =
    deleteStatus === "success" ? (
      <p>Localização excluída com sucesso!</p>
    ) : deleteStatus === "fail" ? (
      <p>Falha ao excluir a Localização. Tente novamente mais tarde.</p>
    ) : (
      <>
        <div className="text-center">
          <p className="confirmation-message">
            Deseja realmente excluir esta Localização?
          </p>
        </div>
        <div className="location-details">
          <p>
            <b>ID: </b>
            {modalData.locationIdToDelete}
          </p>
          <p>
            <b>Nome: </b>
            {modalData.locationToDelete}
          </p>
          <p>
            <b>Latitude: </b>
            {modalData.locationLatitudeToDelete}
          </p>
          <p>
            <b>Longitude: </b>
            {modalData.locationLongitudeToDelete}
          </p>
        </div>
      </>
    );

  return (
    <div>
      <Toast show={toast} toggle={setToast} children={undefined} />
      <h2 className="my-3">Localização Cadastradas</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th className="text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {location.map(
            (location: {
              id_location: number;
              location_name: string;
              latitude: string;
              longitude: string;
            }) => (
              <tr key={location.id_location}>
                <td className="col-2">{location?.location_name}</td>
                <td className="col-2">{location?.latitude}</td>
                <td className="col-2">{location?.longitude}</td>
                <td className="col-1 text-center">
                  {/* Ícone de Editar */}
                  <FontAwesomeIcon
                    icon={faEdit}
                    className="btn btn-sm btn-secondary me-1"
                    onClick={() =>
                      handleEdit(
                        location.id_location as unknown as SetStateAction<null>
                      )
                    }
                  />
                  {/* Ícone de Excluir */}
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="btn btn-sm btn-danger me-1"
                    onClick={() =>
                      handleDelete(
                        location.id_location,
                        location.location_name,
                        location.latitude,
                      )
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
                    modalData.locationIdToDelete !== null &&
                    confirmDelete(modalData.locationIdToDelete)
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
