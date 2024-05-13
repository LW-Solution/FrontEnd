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

export default function ParameterTypesRead({
  parameterTypeList,
  onEditParameterType,
  reload,
}: {
  parameterTypeList: never[];
    onEditParameterType: (id_parameter_type: SetStateAction<null>) => void;
    reload: () => void;
}) {
  const [toast, setToast] = useState(false);
  const [parameterType, setParameterType] = useState([]);

  useEffect(() => {
    if (Array.isArray(parameterTypeList)) {
      setParameterType(parameterTypeList);
    }
  }, [reload, parameterTypeList]);

  const [modalData, setModalData] = useState({
    showModal: false,
    parameterTypeIdToDelete: null,
    parameterTypeToDelete: null,
    parameterTypeEmailToDelete: null,
  });
  const [deleteStatus, setDeleteStatus] = useState(null);

  const handleEdit = (id_parameter_type: SetStateAction<null>) => {
    onEditParameterType && onEditParameterType(id_parameter_type);
  };
  const cancelDelete = () => {
    setModalData({
      showModal: false,
      parameterTypeIdToDelete: null,
      parameterTypeToDelete: null,
      parameterTypeEmailToDelete: null,
    });
    setDeleteStatus(null); // Resetar o status ao cancelar
  };

  const handleDelete = (id_parameter_type: number, nome: string, email: string) => {
    setModalData({
      showModal: true,
      parameterTypeIdToDelete: id_parameter_type,
      parameterTypeToDelete: nome,
      parameterTypeEmailToDelete: email,
    });
    setDeleteStatus(null); // Resetar o status ao abrir o modal
    reload();
  };

  const confirmDelete = async (id_parameter_type: number) => {
    try {
      // Realizar a solicitação DELETE
      const response = await window.stations3001.delete(
        `parameterType/${id_parameter_type ? String(id_parameter_type) : ""}`
      );
      if (response.status === 200) {
        setParameterType(
          parameterType.filter(
            (parameterType: { id_parameter_type: number }) =>
              parameterType.id_parameter_type !== id_parameter_type
          )
        );
      }

      // Atualizar o status para sucesso
      setDeleteStatus("success");

      // Feche o modal após a exclusão ou faça outras ações necessárias
      setModalData({
        showModal: true,
        parameterTypeIdToDelete: null,
        parameterTypeToDelete: null,
        parameterTypeEmailToDelete: null,
      });

      // Atualizar a lista de usuários após a exclusão, se necessário
      const updatedParameterTypes = parameterType.filter(
        (parameterType) => parameterType?.id_parameter_type !== id_parameter_type
      );
      setParameterType(updatedParameterTypes);
      reload();
    } catch (error) {
      console.error("Erro ao excluir o usuário:", error);

      setModalData({
        showModal: true,
        parameterTypeIdToDelete: null,
        parameterTypeToDelete: null,
        parameterTypeEmailToDelete: null,
      });

      // Atualizar o status para falha
      setDeleteStatus("fail");
    }
  };

  const navigate = useNavigate();

  const handleChartClick = (id_parameter_type: number) => {
    navigate(`/admin/dashboard/${id_parameter_type}`);
  };

  const modalContent =
    deleteStatus === "success" ? (
      <p>Usuário excluído com sucesso!</p>
    ) : deleteStatus === "fail" ? (
      <p>Falha ao excluir o usuário. Tente novamente mais tarde.</p>
    ) : (
      <>
        <div className="text-center">
          <p className="confirmation-message">
            Deseja realmente excluir este usuário?
          </p>
        </div>
        <div className="parameterType-details">
          <p>
            <b>ID: </b>
            {modalData.parameterTypeIdToDelete}
          </p>
          <p>
            <b>Nome: </b>
            {modalData.parameterTypeToDelete}
          </p>
          <p>
            <b>E-mail: </b>
            {modalData.parameterTypeEmailToDelete}
          </p>
        </div>
      </>
    );

  return (
    <div>
      <Toast show={toast} toggle={setToast} children={undefined} />
      <h2 className="my-3">Tipos de Parâmetros Cadastrados</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Descrição da Parâmetro</th>
            <th>Nome do Parâmetro</th>
            <th>Fator</th>
            <th>Offset</th>
            <th>Unid. Medida</th>
            <th className="text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {parameterType.map(
            (parameterType: {
              id_parameter_type: number;
              description: string;
              factor: number;
              offset: number;
              unit: {
                id_unit: number;
                unit: string;
              };
            }) => (
              <tr key={parameterType.id_parameter_type}>
                <td className="col-3">{parameterType.description}</td>
                <td className="col-2">{parameterType?.location?.location_name}</td>
                <td className="col-2">{parameterType?.location?.latitude}</td>
                <td className="col-2">{parameterType?.location?.longitude}</td>
                <td className="col-1 text-center">
                  {/* Ícone de Editar */}
                  <FontAwesomeIcon
                    icon={faEdit}
                    className="btn btn-sm btn-secondary me-1"
                    onClick={() =>
                      handleEdit(
                        parameterType.id_parameter_type as unknown as SetStateAction<null>
                      )
                    }
                  />
                  {/* Ícone de Excluir */}
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="btn btn-sm btn-danger me-1"
                    onClick={() =>
                      handleDelete(
                        parameterType.id_parameter_type,
                        parameterType.parameterType_description,
                        parameterType.location.location_name
                      )
                    }
                  />
                  <FontAwesomeIcon
                    icon={faChartLine}
                    className="btn btn-sm btn-primary"
                    onClick={() => handleChartClick(parameterType.id_parameter_type)}
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
                    modalData.parameterTypeIdToDelete !== null &&
                    confirmDelete(modalData.parameterTypeIdToDelete)
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
