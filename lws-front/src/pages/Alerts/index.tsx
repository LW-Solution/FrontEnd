import { useEffect, useState } from "react"
import "./style.scss"
import BodyHeader from "../../components/BodyHeader";
import axios from "axios";
import AlertsCreate from "../../components/Alerts/AlertsCreate";

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
      <div className="my-3 tab-content">
        {/* Cadastro de alertas */}
        <div className="tab-pane" id="cadastrar" role="tabpanel">
          <AlertsCreate />
        </div>
      </div>
    </>
  )
}

