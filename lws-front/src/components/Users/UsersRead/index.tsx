import { useState, useEffect } from "react";
import "./style.scss";
import Modal from "../../Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default function UsersRead() {
  /* const [usuarios, setUsuarios] = useState([]); */
  const [user, setUser] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3000/user/").then((response) => {
      setUser(response.data);
    });
  }, []);

  const [modalData, setModalData] = useState({
    showModal: false,
    userIdToDelete: null,
    userToDelete: null,
  });
  const [deleteStatus, setDeleteStatus] = useState(null);

  const cancelDelete = () => {
    setModalData({
      showModal: false,
      userIdToDelete: null,
      userToDelete: null,
    });
    setDeleteStatus(null); // Resetar o status ao cancelar
  };

  const modalContent =
    deleteStatus === "success" ? (
      <p>Usuário excluído com sucesso!</p>
    ) : deleteStatus === "fail" ? (
      <p>Falha ao excluir o usuário. Tente novamente mais tarde.</p>
    ) : (
      <>
        <p className="confirmation-message">
          Deseja realmente excluir este usuário?
        </p>
        <div className="user-details">
          <p>
            <b>ID: </b>
            {modalData.userIdToDelete}
          </p>
          <p>
            <b>Nome: </b>
            {modalData.userToDelete}
          </p>
        </div>
      </>
    );

  return (
    <div>
      <h2 className="mt-3">Lideres de Projeto:</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome do Usuário</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {user.map((usuario: { id: number; user_name: string }) => (
            <tr key={usuario.id}>
              <td className="col-1">{usuario.id}</td>
              <td className="col-8">{usuario.user_name}</td>
              <td className="col-3">
                {/* Ícone de Editar */}
                <FontAwesomeIcon icon={faEdit} />

                {/* Ícone de Excluir */}
                <FontAwesomeIcon icon={faTrash} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        showModal={modalData.showModal}
        handler={cancelDelete}
        header={() => (
          <h5>
            {deleteStatus === "success"
              ? "Exclusão Bem-sucedida"
              : deleteStatus === "fail"
                ? "Exclusão Falhou"
                : "Confirmação de Exclusão"}
          </h5>
        )}
        footer={() => (
          <>
            {deleteStatus !== "success" && deleteStatus !== "fail" && (
              <>
                <button
                  className="btn btn-danger"
                  onClick={() => { }}
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