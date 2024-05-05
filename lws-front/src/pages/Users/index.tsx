import UsersCreate from "../../components/Users/UsersCreate";
import BodyHeader from "../../components/BodyHeader";
import UsersRead from "../../components/Users/UsersRead";
import UsersUpdate from "../../components/Users/UsersUpdate";
import { SetStateAction, useEffect, useState } from "react";

const navigation = [
  { link: "#listar", title: "Listar" },
  { link: "#cadastrar", title: "Cadastrar" },
  { link: "#editar", title: "Editar" },
];

export default function Users() {
  const [userUpdateId, setuserUpdateIdId] = useState(null);
  const [user, setUser] = useState([]);
  const [reload, setReload] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await window.users3000.get("user");
        setUser(response.data);
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    };
    fetchData();
  }, [reload]); // Este efeito será executado apenas uma vez, no momento da montagem do componente

  const handleReload = () => {
    setReload(true);
  }

  const handleEditarUsuario = (id: SetStateAction<null>) => {
    // Define o ID do usuário que está sendo editado
    setuserUpdateIdId(id);

    // Ativa a aba de edição
    const element = document.getElementById("Editar");
    if (element) {
      element.click();
    }    
  };
  

  const updateUserList = async () => {
    try {
      const response = await window.users3000.get("user");
      setUser(response.data);
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  return (
    <>
      <BodyHeader navigation={navigation}/>
      <div className="my-3 tab-content">
        {/* Listagem de Usuários */}
        <div className="tab-pane active" id="listar" role="tabpanel">
          <UsersRead userList={user} onEditUser={handleEditarUsuario} reload={handleReload} />          
        </div>       

        {/* Cadastro de Usuário */}
        <div className="tab-pane" id="cadastrar" role="tabpanel">
          <UsersCreate updateUserList={updateUserList} reload={handleReload} />
        </div>

        {/* Edição de Usuário */}
        
        <div className="tab-pane" id="editar" role="tabpanel">
          <UsersUpdate
            usuarioId={userUpdateId}            
            updateUserList={updateUserList}
            reload={handleReload}
          />
        </div>        
      </div>
    </>
  );
}
