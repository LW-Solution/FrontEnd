import { useState } from "react";
import axios from "axios";

export default function UsersCreate(/* {updateUserList} */) {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    permissionsId: [1],
  });

  const handleChange = (e: { target: { name: string; value: string; }; }) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };


  const handleSubmit = async (e: { preventDefault: () => void; }) => {

    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/user/", user);
      
      setUser({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        permissionsId: [1],
      });
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  return (
    <div className="container mt-2">
      <div className="card p-4">
        <h2 className="mb-3">Cadastro de Usuário</h2>
        <form /* onSubmit={} */>
          <div className="mb-2">
            <label htmlFor="nome" className="form-label">
              Nome:
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
          <div className="mb-2">
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
          </div>

          <input type="hidden" name="role" value="user" />

          <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
            Cadastrar Usuário
          </button>
        </form>
      </div>
    </div>
  );
}