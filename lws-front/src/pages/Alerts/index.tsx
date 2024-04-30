import { useState } from "react"
import "./style.scss"
import BodyHeader from "../../components/BodyHeader";

const navigation = [
  { link: "#listar", title: "Listar" },
  { link: "#cadastrar", title: "Cadastrar" },
  { link: "#editar", title: "Editar" },
];

export default function Alerts() {

  const [dadosAlerta, setDadosAlerta] = useState({
    condicao: ""
  })

  const handleChange = (enviar: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const {name, value} = enviar.target;
    setDadosAlerta(prevState => (
      {...prevState, 
        [name]: value
      }
    ))
  }

  const handleSubmit = () =>{

  }

  return (
    <>
    <BodyHeader navigation={navigation} />
      <div className="corpoAlerta">
        <div>
          <h1>Crie um Alerta</h1>
        </div>
        <form className="corpoFormulario" onSubmit={handleSubmit}>
          <div className="campoCondicao">
          <div>
            <label>Selecione a estação responsável</label>
            <select>
              <option>estação 1</option>
              <option>estação 2</option>
            </select>
          </div>
            <label>Condição</label>
            <select value={dadosAlerta.condicao} onChange={handleChange}>
              <option value="igual">igual</option>
              <option value="maior que">maior que</option>
              <option value="menor que">menor que</option>
              <option value="maior ou igual">maior ou igual</option>
              <option value="menor ou igual">menor ou igual</option>
            </select>
          </div>

          <button type="submit">Criar</button>
        </form>
      </div>
    </>
  )
}

