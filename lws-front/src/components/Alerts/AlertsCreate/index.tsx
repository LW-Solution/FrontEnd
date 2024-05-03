import React, { FormEvent, useEffect, useState } from "react"
import BodyHeader from "../../BodyHeader";
import axios from "axios";
import { stringify } from "querystring";

// MODELO DE REQUEST
// APAGAR OBJETOS MOCKADOS
// VERIFICAR ADAPTACOES
// FAZER O PULL ANTES 

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

export default function AlertsCreate() {

  const [stations, setStations] = useState({
    station_description: "",
    location: {
      id_location: "",
      location_name: "",
      latitude: "",
      longitude: "",
    },
  });
  
  const [stationSelected, setStationSelected] = useState<objetoEstacao | undefined>()

  const [dadosAlerta, setDadosAlerta] = useState({
    condicao: "",
    station: {},
    parameter_type: {
        stationParameters: [
            {
                measures: [
                    {
                        value: 0
                    }
                ]
            }
        ]
    },
    occurrences: {}
  })

  

  useEffect(() => {
    
    async function buscarEstacoes(){
      try {
        console.log("Tentando buscar lista de estacoes")
        const response = await fetch("http://localhost:3001/station/")
        if(!response.ok){
          throw new Error("erro ao fazer busca de estacoes")
        }

        const data = await response.json();

        setStations(data);

      // await setStations(lista);

      } catch (error) {
        console.error("falha ao tentar buscar lista de estacoes", error)
      }
    }

    buscarEstacoes();

  }, [])



  const handleChange = (evento: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const {name, value} = evento.target;
    
    // let alertaVar = dadosAlerta; 
    // alertaVar.parameter_type.stationParameters[0].measures[0].value = Number(value)

    if(name === "condicao"){
        setDadosAlerta(prevState => (
            {...prevState, 
              [name]: value
            } 
          ))
    }else if(name === "value"){
        setDadosAlerta(prevState => (
            {...prevState,
                parameter_type: {
                    ...prevState.parameter_type,
                    stationParameters: [
                        {
                            measures: [
                                {
                                    value: Number(value)
                                }
                            ]
                        }
                    ]
                }
            }
        ))
    }
    
  }

  const handleSubmit = async (enviar: React.FormEvent<HTMLFormElement>) =>{
    enviar.preventDefault();

    try {
        const response = await fetch("http://localhost:3001/station/", {
            method: "POST",
            headers: {
                "Content_type": "application/json"
            },
            body: JSON.stringify(dadosAlerta)
        });

        if(response.ok){
            console.log("Alerta cadastrado")
        }else{
            console.error("Erro ao enviar dados para cadastro de alerta")
        }
    } catch (error) {
        console.error("Erro ao tentar cadastrar um alerta", error);
    }

    console.log(dadosAlerta)
  }

  return (
    <div className="container mt-2">

      <div className="card p-4">
        
          <h2 className="mb-3">Crie um Alerta</h2>
    
        <form  onSubmit={handleSubmit}>
          <div >
          <div className="mb-2">
            <label htmlFor="nome" className="form-label">Selecione a estação responsável</label>
            <select className="form-control" onChange={(evento => {
              const selectedStationId = evento.target.value;
              const numberSelectedStationId = Number(selectedStationId)
              const setarStationObject = stations.find(station => station.id_station === numberSelectedStationId);
              setStationSelected(setarStationObject);
            })}>
              {stations.map( station => (
                <option key={station.id_station} value={station.id_station}>
                  {station.station_description}
                </option>
              ))}
            </select>
          </div>
            <label className="form-label" >Condição</label>
            <select name="condicao" className="form-control" onChange={handleChange}>
              <option value="igual">igual</option>
              <option value="maior que">maior que</option>
              <option value="menor que">menor que</option>
              <option value="maior ou igual">maior ou igual</option>
              <option value="menor ou igual">menor ou igual</option>
            </select>
            <div style={{ alignItems:"center", marginBottom:"20px", marginTop: "15px"}}>
              <label style={{marginRight: "10px"}}>Valor: </label>
              <input name="value" type="number" style={{marginRight: "10px"}} onChange={handleChange}></input>
              <span id="tipoValorAlerta" style={{marginRight: "10px"}}>{stationSelected?.station_parameter[0]?.parameter_type?.unit?.unit}</span>
            </div>
          </div>

          <button type="submit" className="btn btn-secondary">Criar</button>
        </form>
      </div>
    </ div>
  )
}
