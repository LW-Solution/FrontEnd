import { useState, useEffect, SetStateAction } from "react";
import "./style.scss";
import Modal from "../../Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Toast from "../../Toast";

interface Params {
  id: number;
  name: string;
  type: string;
  unity: string;
  factor: number;
  offset: number;
}

// Dados fictícios
const fakeData = [
  {
    id: 1,
    name: "Bateria",
    type: "Tipo 1",
    unity: "V",
    factor: 1.0,
    offset: 0.0,
  },
  {
    id: 2,
    name: "Direção do Vento",
    type: "Tipo 2",
    unity: "°",
    factor: 1.0,
    offset: 0.0,
  },
  {
    id: 3,
    name: "Precipitação",
    type: "Tipo 3",
    unity: "mm",
    factor: 1.0,
    offset: 0.0,
  },
  {
    id: 4,
    name: "Pressão",
    type: "Tipo 4",
    unity: "mm Hg",
    factor: 1.0,
    offset: 0.0,
  },
  {
    id: 5,
    name: "Temperatura",
    type: "Tipo 5",
    unity: "°C",
    factor: 1.0,
    offset: 0.0,
  },
  {
    id: 6,
    name: "Umidade",
    type: "Tipo 6",
    unity: "%",
    factor: 1.0,
    offset: 0.0,
  },
  {
    id: 7,
    name: "Velocidade do Vento",
    type: "Tipo 7",
    unity: "m/s",
    factor: 1.0,
    offset: 0.0,
  },

  // Adicione mais dados conforme necessário
];

interface ParamsReadProps {
  userList: Params[];
  onEditUser: (id: SetStateAction<null>) => void;
}

export default function ParamsRead({ userList, onEditUser }: ParamsReadProps) {
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
      <h2 className="my-3">Parâmetros Cadastrados</h2>
      <table className="table">
        <thead>
          <tr>
            <th > ID</th>
            <th >Descrição</th>
            <th >Tipo</th>
            <th >Unid. Medida</th>
            <th >Fator</th>
            <th>Offset</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {user.map(
            (fakeData: Params) => (
              <tr key={fakeData.id}>
                <td>{fakeData.id}</td>
                <td>{fakeData.name}</td>
                <td>{fakeData.type}</td>
                <td>{fakeData.unity}</td>
                <td>{fakeData.factor}</td>
                <td>{fakeData.offset}</td>
                <td>
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
                    onClick={
                      () =>
                        handleDelete(fakeData.id, fakeData.name, fakeData.type) // Substituído 'usuario' por 'fakeData' e 'user_name' e 'email' por 'name' e 'type'
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
