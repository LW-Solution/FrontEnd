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
  station_parameter: [
    {
      parameter_type: {
        unit: {
          unit: 'milimetros cubicos'
        }
      }
    }
  ];
  alerts: [];
}

const objeto1: objetoEstacao = {
  id_station: 1,
  station_description: "descricao",
  location: {},
  station_parameter: [
    {
      parameter_type: {
        unit: {
          unit: 'milimetros cubicos'
        }
      }
    }
  ],
  alerts: []
}

const objeto2: objetoEstacao = {
  id_station: 2,
  station_description: "descricao2",
  location: {},
  station_parameter: [
    {
      parameter_type: {
        unit: {
          unit: 'milimetros cubicos'
        }
      }
    }
  ],
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
            <label className="form-label" >Condição</label>
            <select value={dadosAlerta.condicao} className="form-control" onChange={handleChange}>
              <option value="igual">igual</option>
              <option value="maior que">maior que</option>
              <option value="menor que">menor que</option>
              <option value="maior ou igual">maior ou igual</option>
              <option value="menor ou igual">menor ou igual</option>
            </select>
            <div style={{ alignItems:"center", marginBottom:"20px", marginTop: "15px"}}>
              <label id="valorDoAlerta" style={{marginRight: "10px"}}>Valor: </label>
              <input type="text" id="inputValorAlerta" style={{marginRight: "10px"}}></input>
              <span id="tipoValorAlerta" style={{marginRight: "10px"}}>{objeto1.station_parameter[0]?.parameter_type?.unit?.unit}</span>
            </div>
          </div>

          <button type="submit" className="btn btn-secondary">Criar</button>
        </form>
      </div>
    </>
  )
}

