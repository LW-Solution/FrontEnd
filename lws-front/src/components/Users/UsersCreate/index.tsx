import { useState } from "react";

export default function UsersCreate(/* {updateUserList} */) {
  const [usuario, setUsuario] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
    role: "LIDER_DE_PROJETO",
  });

  const handleChange = (e: { target: { name: string; value: string; }; }) => {
    const { name, value } = e.target;
    setUsuario((prevUsuario) => ({
      ...prevUsuario,
      [name]: value,
    }));
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
              id="nome"
              name="nome"
              value={usuario.nome}
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
              value={usuario.email}
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
              id="senha"
              name="senha"
              value={usuario.senha}
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
              id="confirmarSenha"
              name="confirmarSenha"
              value={usuario.confirmarSenha}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          {/* Campo hidden de "role" */}
          <input type="hidden" name="role" value="user" />

          <button type="submit" className="btn btn-primary">
            Cadastrar Usuário
          </button>
        </form>
      </div>
    </div>
  );
}