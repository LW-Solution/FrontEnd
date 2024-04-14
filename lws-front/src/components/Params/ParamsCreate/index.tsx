import { useState } from "react";
import Toast from "../../Toast";

interface Params {
  id: number;
  name: string;
  type: string;
  unity: string;
  factor: number;
  offset: number;
}

interface ParamsReadProps {
  userList: Params[];
  onEditUser: (id: SetStateAction<null>) => void;
}

const unitys = ["Selecione uma opção","V", "°", "mm", "mm Hg", "°C", "%", "m/s"];

export default function ParamsCreate({
  userList,
  onEditUser,
}: ParamsReadProps) {
  const [toast, setToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    permissionsId: [1],
  });

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      await window.users3000.post("user", user);

      setToastMessage(`Parâmetro cadastrada com sucesso!`);
      setToast(true);

      setUser({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        permissionsId: [1],
      });
      updateUserList();
    } catch (error) {
      console.error("Erro na requisição:", error);
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

      <div className="card p-4">
        <h2 className="mb-3">Cadastro de Parâmetros</h2>
        <form>
          <div className="mb-2">
            <label htmlFor="nome" className="form-label">
              Descrição do Parâmetro:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={user.name}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="email" className="form-label">
              Tipo:
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
            <label htmlFor="unity" className="form-label">
              Unidade de Medida:
            </label>
            <select
              id="unity"
              onChange={handleChange}
              className="form-control"
              required
            >
              {unitys.map((unity, index) => (
                <option key={index} value={unity}>
                  {unity}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-2">
            <label htmlFor="senha" className="form-label">
              Fator:
            </label>
            <input
              type="text"
              id="longitude"
              /* name="password"
              value={user.password} */
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="senha" className="form-label">
              Offset:
            </label>
            <input
              type="text"
              id="longitude"
              /* name="password"
              value={user.password} */
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="senha" className="form-label">
              Fator:
            </label>
            <input
              type="text"
              id="longitude"
              /* name="password"
              value={user.password} */
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="senha" className="form-label">
              Offset:
            </label>
            <input
              type="text"
              id="longitude"
              /* name="password"
              value={user.password} */
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
          </div> */}

          <input type="hidden" name="role" value="user" />

          <button
            type="submit"
            className="btn btn-secondary"
            onClick={handleSubmit}
          >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
