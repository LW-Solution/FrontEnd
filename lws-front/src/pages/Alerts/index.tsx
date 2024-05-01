import { useEffect, useState } from "react"
import "./style.scss"
import BodyHeader from "../../components/BodyHeader";
import axios from "axios";

const navigation = [
  { link: "#listar", title: "Listar" },
  { link: "#cadastrar", title: "Cadastrar" },
  { link: "#editar", title: "Editar" },
];

interface objetoEstacao {
  id_station: number;
  station_description: string;
  location: {};
  station_parameter: [];
  alerts: [];
}

const objeto1: objetoEstacao = {
  id_station: 1,
  station_description: "descricao",
  location: {},
  station_parameter: [],
  alerts: []
}

const objeto2: objetoEstacao = {
  id_station: 2,
  station_description: "descricao2",
  location: {},
  station_parameter: [],
  alerts: []
}

const lista: objetoEstacao[] = [objeto1,objeto2];

export default function Alerts() {

  const [stations, setStations] = useState<Array<objetoEstacao>>([])
  
  const [dadosAlerta, setDadosAlerta] = useState({
    condicao: ""
  })

  

  useEffect(() => {
    
    async function buscarEstacoes(){
      try {
      //   console.log("Tentando buscar lista de estacoes")
      //   const response = await fetch("http://localhost:3001/station/")

      //   const data = await response.json();

      //   setStations(data);

      await setStations(lista);

      } catch (error) {
        console.error("falha ao tentar buscar lista de estacoes", error)
      }
    }

    buscarEstacoes();

  }, [])



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
          <div className="mb-2">
            <label htmlFor="nome" className="form-label">Selecione a estação responsável</label>
            <select className="form-control">
              {/* <option>estação 1</option>
              <option>estação 2</option> */}
              {stations.map( station => (
                <option key={station.id_station} value={station.id_station}>
                  {station.station_description}
                </option>
              ))}
            </select>
          </div>
            <label >Condição</label>
            <select value={dadosAlerta.condicao} onChange={handleChange}>
              <option value="igual">igual</option>
              <option value="maior que">maior que</option>
              <option value="menor que">menor que</option>
              <option value="maior ou igual">maior ou igual</option>
              <option value="menor ou igual">menor ou igual</option>
            </select>
          </div>

          <div className="mb-2">
            <label htmlFor="nome" className="form-label">
              Descrição da Estação:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <button type="submit">Criar</button>
        </form>
      </div>
    </>
  )
}

