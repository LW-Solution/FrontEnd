import { useState } from "react"
import "./style.scss"

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
      <div className="corpoAlerta">
        <div>
          <h1>Crie um Alerta</h1>
        </div>
        <form className="corpoFormulario" onSubmit={handleSubmit}>
          <div className="campoCondicao">
            <label>Condição</label>
            <select value={dadosAlerta.condicao} onChange={handleChange}>
              <option value="igual">igual</option>
              <option value="maior que">maior que</option>
              <option value="menor que">menor que</option>
              <option value="maior ou igual">maior ou igual</option>
              <option value="menor ou igual">menor ou igual</option>
            </select>
          </div>
          <div>
            <label>Tipo de parâmetro</label>
            <input type="string"></input>
          </div>
          <div>
            <label>Estação</label>
            <select>
              <option>estação 1</option>
              <option>estação 2</option>
            </select>
          </div>
          <div>
            <label>Ocorrência</label>
            <input type="string"></input>
          </div>

          <button type="submit">Criar</button>
        </form>
      </div>
    </>
  )
}

