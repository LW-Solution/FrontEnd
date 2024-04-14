import { useState, useEffect } from "react";
import Toast from "../../Toast";

export default function UsersUpdate({
  usuarioId,
  updateUserList,
}: {
  usuarioId: null;
  updateUserList: () => Promise<void>;
}) {
  const [user, setUser] = useState({
    user_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    permissionsId: [1],
  });

  const [toast, setToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await window.users3000.get(
          `user/byid/${usuarioId ? parseInt(usuarioId) : ""}`
        );
        setUser(response.data);
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    };

    fetchData();
  }, [usuarioId]);

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleUpdate = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const updateUser = {
      name: user.user_name,
      email: user.email,
      password: user.password,
      confirmPassword: user.confirmPassword,
      permissionsId: [1],
    };

    try {
      await window.users3000.put(
        `user/${usuarioId ? parseInt(usuarioId) : ""}`,
        updateUser
      );
      updateUserList();
      setToastMessage("Usuário atualizado com sucesso!");
      setToast(true);

      /* const element = document.getElementById("Listagem");
      if (element) {
        element.click();
        setToastMessage("Usuário atualizado com sucesso!");
        setToast(true);
      } */
    } catch (error) {
      console.error("Erro ao atualizar o Usuário:", error);
      setToastMessage("Erro ao atualizar o usuário.");
      setToast(true);
    }
  };

  return (
    <div className="container mt-2">
      <Toast
        show={toast}
        toggle={() => setToast(false)}
        type={toastMessage.includes("sucesso") ? "success" : "danger"}
      >
        {toastMessage}
      </Toast>

      {usuarioId ? (
        <div className="card p-4">
          <h2 className="mb-3">Editar Usuário</h2>
          <form>
            {/* Nome */}
            <div className="mb-2">
              <label htmlFor="nome" className="form-label">
                Nome:
              </label>
              <input
                type="text"
                id="user_name"
                name="user_name"
                value={user.user_name}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-2">
              <label htmlFor="email" className="form-label">
                E-mail:
              </label>
              <input
                type="text"
                id="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                className="form-control"
                inputMode="text"
                required
              />
            </div>
            <div className="mb-2">
              <label htmlFor="senha" className="form-label">
                Senha:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            {/* <div className="mb-2">
            <label htmlFor="senha" className="form-label">
              Confrimar Senha:
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={user.confirmPassword}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>   */}

            {/* Botão de Atualizar */}
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleUpdate}
            >
              Atualizar
            </button>
          </form>
        </div>
      ) : (
        <p className="text-center">
          Selecione o Usuário que deseja Editar na aba Listar
        </p>
      )}
    </div>
  );
}
