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

export default function UnitRead({
  unitList,
  onEditUnit,
  reload,
}: {
  unitList: never[];
    onEditUnit: (id_unit: SetStateAction<null>) => void;
    reload: () => void;
}) {
  const [toast, setToast] = useState(false);
  const [unit, setUnit] = useState([]);

  useEffect(() => {
    if (Array.isArray(unitList)) {
      setUnit(unitList);
    }
  }, [reload, unitList]);

  const [modalData, setModalData] = useState({
    showModal: false,
    unitIdToDelete: null,
    unitToDelete: null,
    unitEmailToDelete: null,
  });
  const [deleteStatus, setDeleteStatus] = useState(null);

  const handleEdit = (id_unit: SetStateAction<null>) => {
    onEditUnit && onEditUnit(id_unit);
  };
  const cancelDelete = () => {
    setModalData({
      showModal: false,
      unitIdToDelete: null,
      unitToDelete: null,
      unitEmailToDelete: null,
    });
    setDeleteStatus(null); // Resetar o status ao cancelar
  };

  const handleDelete = (id_unit: number, nome: string, email: string) => {
    setModalData({
      showModal: true,
      unitIdToDelete: id_unit,
      unitToDelete: nome,
      unitEmailToDelete: email,
    });
    setDeleteStatus(null); // Resetar o status ao abrir o modal
    reload();
  };

  const confirmDelete = async (id_unit: number) => {
    try {
      // Realizar a solicitação DELETE
      const response = await window.stations3001.delete(
        `unit/${id_unit ? String(id_unit) : ""}`
      );
      if (response.status === 200) {
        setUnit(
          unit.filter(
            (unit: { id_unit: number }) =>
              unit.id_unit !== id_unit
          )
        );
      }

      // Atualizar o status para sucesso
      setDeleteStatus("success");

      // Feche o modal após a exclusão ou faça outras ações necessárias
      setModalData({
        showModal: true,
        unitIdToDelete: null,
        unitToDelete: null,
        unitEmailToDelete: null,
      });

      // Atualizar a lista de usuários após a exclusão, se necessário
      const updatedUnit = unit.filter(
        (unit) => unit.id_unit !== id_unit
      );
      setUnit(updatedUnit);
      reload();
    } catch (error) {
      console.error("Erro ao excluir a unidade:", error);

      setModalData({
        showModal: true,
        unitIdToDelete: null,
        unitToDelete: null,
        unitEmailToDelete: null,
      });

      // Atualizar o status para falha
      setDeleteStatus("fail");
    }
  };

  const modalContent =
    deleteStatus === "success" ? (
      <p>Unidade excluída com sucesso!</p>
    ) : deleteStatus === "fail" ? (
      <p>Falha ao excluir a Unidade. Tente novamente mais tarde.</p>
    ) : (
      <>
        <div className="text-center">
          <p className="confirmation-message">
            Deseja realmente excluir esta Unidade?
          </p>
        </div>
        <div className="unit-details">
          <p>
            <b>ID: </b>
            {modalData.unitIdToDelete}
          </p>
          <p>
            <b>Nome: </b>
            {modalData.unitToDelete}
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
            <th>Unidade de Medida</th>
            <th className="text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {unit.map(
            (unit: {
              id_unit: number;
              unit: string;
            }) => (
              <tr key={unit.id_unit}>
                <td className="col-3">{unit.unit}</td>
                <td className="col-1 text-center">
                  {/* Ícone de Editar */}
                  <FontAwesomeIcon
                    icon={faEdit}
                    className="btn btn-sm btn-secondary me-1"
                    onClick={() =>
                      handleEdit(
                        unit.id_unit as unknown as SetStateAction<null>
                      )
                    }
                  />
                  {/* Ícone de Excluir */}
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="btn btn-sm btn-danger me-1"
                    onClick={() =>
                      handleDelete(
                        unit.id_unit,
                        unit.unit,
                        unit.unit
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
                    modalData.unitIdToDelete !== null &&
                    confirmDelete(modalData.unitIdToDelete)
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
