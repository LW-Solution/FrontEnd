import { Link } from "react-router-dom";
import UsersCreate from "../../components/Users/UsersCreate";
import BodyHeader from "../../components/BodyHeader";

const navigation = [
  { link: "#listar", title: "Listar" },
  { link: "#cadastrar", title: "Cadastrar" },
  { link: "#editar", title: "Editar" },
];

export default function Users() {
  /* const [usuarioEditandoId, setUsuarioEditandoId] = useState(null);
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await window.axios.get("auth/lideres");
        setUsuarios(response.data);
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    };

    fetchData();
  }, []); // Este efeito será executado apenas uma vez, no momento da montagem do componente

  const handleEditarUsuario = (id) => {
    // Define o ID do usuário que está sendo editado
    setUsuarioEditandoId(id);

    // Ativa a aba de edição
    document.getElementById("Editar").click();
  };

  const updateUserList = async () => {
    try {
      const response = await window.axios.get("auth/lideres");
      setUsuarios(response.data);
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  }; */

  return (
    <>
      <BodyHeader navigation={navigation}/>
      <div className="my-3 tab-content">
        {/* Listagem de Usuários */}
        <div className="tab-pane active" id="listar" role="tabpanel">
          AQUI VAI A LISTAGEM DOPS USERS
          {/* <ListagemUsuario
            usuarios={usuarios}
            onEditUser={handleEditarUsuario}
            updateUserList={updateUserList}
          /> */}
        </div>       

        {/* Cadastro de Usuário */}
        <div className="tab-pane" id="cadastrar" role="tabpanel">
          <UsersCreate /* updateUserList={updateUserList} */ />
        </div>

        {/* Edição de Usuário */}
        {/* <div className="tab-pane" id="editar" role="tabpanel">
          <EditarUsuario
            usuarioId={usuarioEditandoId}
            updateUserList={updateUserList}
          />
        </div> */}
      </div>
    </>
  );
}
