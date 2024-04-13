
import axios from "axios";
import { useState, useEffect } from "react";


export default function UsersUpdate({ usuarioId, updateUserList }: { usuarioId: null, updateUserList: () => Promise<void> }) {
  const [user, setUser] = useState({   
    user_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    permissionsId: [1],    
  });  

  useEffect(() => {  
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/user/byid/${usuarioId ? parseInt(usuarioId) : ''}`);
        setUser(response.data);
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    };

    fetchData();
  }, [usuarioId]);

  const handleChange = (e: { target: { name: string; value: string; }; }) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

 const handleUpdate = async () => {
    const updateUser = {
      name: user.user_name,
      email: user.email,
      password: user.password,
      confirmPassword: user.confirmPassword,
      permissionsId: [1],
    };

    try {
      await axios.put(`http://localhost:3000/user/${usuarioId ? parseInt(usuarioId) : ''}`, updateUser);
      updateUserList();

      const element = document.getElementById("Listagem");
      if (element) {
        element.click();
      }
    } catch (error) {
      console.error("Erro ao atualizar o Usuário:", error);
    
    }
  };

  return (
    <div className="container mt-2">
      
      {/* {usuarioId ? ( */}
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

            {/* Botão de Atualizar */}
            <button
              type="button"
              className="btn btn-primary"
               onClick={handleUpdate}
            >
              Atualizar Usuário
            </button>
          </form>
        </div>
      {/* ) : (
        <p className="text-center">Volte para a página de listagem.</p>
      )} */}
    </div>
  );
}