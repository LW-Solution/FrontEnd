import "./style.scss"

export default function Alerts() {
  return (
    <>
      <div className="corpoAlerta">
        <div>
          <h1>Crie um Alerta</h1>
        </div>
        <form className="corpoFormulario">
          <div className="campoCondicao">
            <label>Condição</label>
            <select>
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
            <input type="string"></input>
          </div>
          <div>
            <label>Ocorrência</label>
            <input type="string"></input>
          </div>
        </form>
      </div>
    </>
  )
}

