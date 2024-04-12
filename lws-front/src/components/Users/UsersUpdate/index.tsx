
import { useState } from "react";


export default function UsersUpdate(/* { usuarioId, updateUserList } */) {
  const [usuario, setUsuario] = useState({   
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",    
  });  

/*   useEffect(() => {
    // Verifica se há um ID válido
    if (!usuarioId) {
      setToastMessage("Clique em editar na página de Listagem");
      setToast(true);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `auth/lideres/${parseInt(usuarioId, 10)}`,
        );
        setLider(response.data);
      } catch (error) {
        console.error("Erro na requisição:", error);
        // Lide com o erro da forma que desejar (ex.: redirecione para uma página de erro)
      }
    };

    fetchData();
  }, [usuarioId]); */

  const handleChange = (e: { target: { name: string; value: string; }; }) => {
    const { name, value } = e.target;
    setUsuario((prevUsuario) => ({
      ...prevUsuario,
      [name]: value,
    }));
  };

  /* const handleUpdate = async () => {
    const { senha, login, cpf, nome } = lider;
    const updateLider = { senha, login, nome, cpf };

    try {
      await axios.put(`auth/atualizar/${usuarioId}`, updateLider);
      updateUserList();

      document.getElementById("Listagem").click();
      setToastMessage("Líder atualizado com sucesso!");
      setToast(true);
    } catch (error) {
      console.error("Erro ao atualizar o líder:", error);
      // Lide com o erro da forma que desejar (ex.: exiba uma mensagem de erro no toast)

      // Verifica se o erro é de validação (código 400)
      if (error.response && error.response.status === 400) {
        setToastMessage("Nome já cadastrado!");
      } else {
        // Se for um erro diferente de validação, você pode lidar de outra forma
        setToastMessage("Erro ao processar a requisição.");
      }

      setToast(true);
    }
  }; */

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

            {/* Botão de Atualizar */}
            <button
              type="button"
              className="btn btn-primary"
              /* onClick={handleUpdate} */
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