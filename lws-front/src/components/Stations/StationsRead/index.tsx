import { useState, useEffect, SetStateAction } from "react";
import "./style.scss";
import Modal from "../../Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Toast from "../../Toast";

// Dados fictícios
const fakeData = [
  { id: 1, name: 'Estação 1', location: 'Localização 1', coordenate: "coordenada 1" },
  { id: 2, name: 'Estação 2', location: 'Localização 2', coordenate: "coordenada 2" },
  { id: 3, name: 'Estação 3', location: 'Localização 3', coordenate: "coordenada 3" },
  // Adicione mais dados conforme necessário
];

export default function StationsRead({
  userList,
  onEditUser,
}: {
  userList: never[];
  onEditUser: (id: SetStateAction<null>) => void;
}) {
  const [toast, setToast] = useState(false);
  const [user, setUser] = useState(fakeData); // Usando dados fictícios

  // Comente o useEffect até que o backend esteja conectado
  // useEffect(() => {
  //   if (Array.isArray(userList)) {
  //     setUser(userList);
  //   }
  // }, [userList]);

  const [modalData, setModalData] = useState({
    showModal: false,
    userIdToDelete: null,
    userToDelete: null,
    userEmailToDelete: null,
  });
  const [deleteStatus, setDeleteStatus] = useState(null);

  const handleEdit = (id: SetStateAction<null>) => {
    console.log(`Editar usuário com ID ${id}`);
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

  const handleDelete = (id: number, nome: string, email: string) => {
    setModalData({
      showModal: true,
      userIdToDelete: id,
      userToDelete: nome,
      userEmailToDelete: email,
    });
    setDeleteStatus(null); // Resetar o status ao abrir o modal
  };

  // Comente a função confirmDelete até que o backend esteja conectado
  // const confirmDelete = async (id: number) => {
  //   try {
  //     // Realizar a solicitação DELETE
  //     const response = await window.users3000.delete(`user/${id ? String(id) : ""}`);
  //     if (response.status === 200) {
  //       setUser(user.filter((usuario: { id: number }) => usuario.id !== id));
  //     }

  //     // Atualizar o status para sucesso
  //     setDeleteStatus("success");

  //     // Feche o modal após a exclusão ou faça outras ações necessárias
  //     setModalData({
  //       showModal: true,
  //       userIdToDelete: null,
  //       userToDelete: null,
  //       userEmailToDelete: null,
  //     });

  //     // Atualizar a lista de usuários após a exclusão, se necessário
  //     const updatedUsers = user.filter((user) => user.id !== id);
  //     setUser(updatedUsers);
  //   } catch (error) {
  //     console.error("Erro ao excluir o usuário:", error);

  //     setModalData({
  //       showModal: true,
  //       userIdToDelete: null,
  //       userToDelete: null,
  //       userEmailToDelete: null,
  //     });

  //     // Atualizar o status para falha
  //     setDeleteStatus("fail");
  //   }
  // };

  const modalContent =
    deleteStatus === "success" ? (
      <p >Estação excluída com sucesso!</p>
    ) : deleteStatus === "fail" ? (
      <p>Falha ao excluir a estação. Tente novamente mais tarde.</p>
    ) : (
      <>
        <div className="text-center">
          <p className="confirmation-message">
            Deseja realmente excluir a estação?
          </p>
        </div>
        <div className="user-details">
          <p>
            <b>ID: </b>
            {modalData.userIdToDelete}
          </p>
          <p>
            <b>Descrição: </b>
            {modalData.userToDelete}
          </p>
          <p>
            <b>Local: </b>
            {modalData.userEmailToDelete}
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
            <th>ID</th>
            <th>Descrição</th>
            <th>Local</th>
            <th>Coordenadas</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {user.map(
            (fakeData: { id: number; name: string; location: string, coordenate: string }) => (
              <tr key={fakeData.id}>
                <td className="col-1">{fakeData.id}</td>
                <td className="col-6">{fakeData.name}</td>
                <td className="col-2">{fakeData.location}</td>
                <td className="col-2">{fakeData.coordenate}</td>
                <td className="col-4">
                  {/* Ícone de Editar */}
                  <FontAwesomeIcon
                    icon={faEdit}
                    className="btn btn-secondary me-1"
                    onClick={() =>
                      handleEdit(usuario.id as unknown as SetStateAction<null>)
                    }
                  />
                  {/* Ícone de Excluir */}
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="btn btn-danger"
                    onClick={() =>
                      handleDelete(usuario.id, usuario.user_name, usuario.email)
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