import { useState, useEffect, SetStateAction } from "react";
import "./style.scss";
import Modal from "../../Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Toast from "../../Toast";
import { User, ModalData, DeleteStatus } from "../../../types";

export default function UsersRead({
  userList,
  onEditUser,
}: {
  userList: never[];
  onEditUser: (id: SetStateAction<null>) => void;
}) {
  const [toast, setToast] = useState(false);
  const [user, setUser] = useState<User[]>([]);

  useEffect(() => {
    if (Array.isArray(userList)) {
      setUser(userList);
    }
  }, [userList]);

  const [modalData, setModalData] = useState<ModalData>({
    showModal: false,
    userIdToDelete: null,
    userToDelete: null,
    userEmailToDelete: null,
  });

  const [deleteStatus, setDeleteStatus] = useState<DeleteStatus>(null);

  const handleEdit = (id: SetStateAction<null>) => {
    onEditUser && onEditUser(id);
  };
  const cancelDelete = () => {
    setModalData({
      showModal: false,
      userIdToDelete: null,
      userToDelete: null,
      userEmailToDelete: null,
    });
    setDeleteStatus(null); // Resetar o status ao cancelar
  };

  const handleDelete = (user: User) => {
    setModalData({
      showModal: true,
      userIdToDelete: user.id,
      userToDelete: user.user_name,
      userEmailToDelete: user.email,
    });
    setDeleteStatus(null); // Resetar o status ao abrir o modal
  };

  const confirmDelete = async (id: number) => {
    try {
      // Realizar a solicitação DELETE
      const response = await window.users3000.delete(
        `user/${id ? String(id) : ""}`
      );
      if (response.status === 200) {
        setUser(user.filter((usuario: { id: number }) => usuario.id !== id));
      }

      // Atualizar o status para sucesso
      setDeleteStatus("success");

      // Feche o modal após a exclusão ou faça outras ações necessárias
      setModalData({
        showModal: true,
        userIdToDelete: null,
        userToDelete: null,
        userEmailToDelete: null,
      });

      // Atualizar a lista de usuários após a exclusão, se necessário
      const updatedUsers = user.filter((user) => user.id !== id);
      setUser(updatedUsers);
    } catch (error) {
      console.error("Erro ao excluir o usuário:", error);

      setModalData({
        showModal: true,
        userIdToDelete: null,
        userToDelete: null,
        userEmailToDelete: null,
      });

      // Atualizar o status para falha
      setDeleteStatus("fail");
    }
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
        <div className="user-details">
          <p>
            <b>ID: </b>
            {modalData.userIdToDelete}
          </p>
          <p>
            <b>Nome: </b>
            {modalData.userToDelete}
          </p>
          <p>
            <b>E-mail: </b>
            {modalData.userEmailToDelete}
          </p>
        </div>
      </>
    );

  return (
    <div>
      <Toast show={toast} toggle={setToast} children={""} type={""} />
      <h2 className="my-3">Usuários Cadastrados</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Nome do Usuário</th>
            <th>E-mail</th>
            <th className="text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {user.map(
            (usuario: User) => (
              <tr key={usuario.id}>
                <td className="col-7">{usuario.user_name}</td>
                <td className="col-4">{usuario.email}</td>
                <td className="col-1 text-center">
                  {/* Ícone de Editar */}
                  <FontAwesomeIcon
                    icon={faEdit}
                    className="btn btn-sm btn-secondary me-1"
                    onClick={() =>
                      handleEdit(usuario.id as unknown as SetStateAction<null>)
                    }
                  />
                  {/* Ícone de Excluir */}
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="btn btn-sm btn-danger"
                    onClick={() =>
                      handleDelete(usuario)
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
                    modalData.userIdToDelete !== null &&
                    confirmDelete(modalData.userIdToDelete)
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
