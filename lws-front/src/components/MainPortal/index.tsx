import React, { useEffect, useState } from "react";
import CardComInfo from "../../components/CardComInfo";
import CardSemInfo from "../../components/CardSemInfo";

const MainPortal: React.FC = () => {
  const [location, setLocation] = useState(null);
  const [city, setCity] = useState("");
  const [stations, setStations] = useState([]);
  const [stationParameters, setStationParameters] = useState([]);
  const [parameters, setParameters] = useState([]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });

          const apiKey = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=pt-br`;
          fetch(apiKey)
            .then((response) => response.json())
            .then((data) => setCity(data))
            .catch((error) =>
              console.error("Erro ao encontrar nome da cidade: ", error)
            );
        },
        (error) => {
          console.error("Erro ao encontrar localização: ", error);
        }
      );
    } else {
      console.warn("Geolocalização não está disponível.");
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await window.stations3001.get("station");
        setStations(response.data);
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await window.stations3001.get(`stationParameter`);
        setStationParameters(response.data);
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (stations && city) {
      const foundStation = stations.find(
        (station) => station?.station_description === city?.city
      );
      if (foundStation) {
        console.log("Estação encontrada:", foundStation);
        const fetchParameters = async () => {
          try {
            const foundParameters = await stationParameters.filter(
              (stationParameter) =>
                stationParameter?.station?.station_description ===
                foundStation?.station_description
            );
            if (foundParameters) {
              setParameters(foundParameters);
            }
          } catch (error) {
            console.error("Erro ao buscar parâmetros da estação:", error);
          }
        };
        fetchParameters();
      } else {
        console.log(
          "Nenhuma estação correspondente encontrada para:",
          city.city
        );
      }
    }
  }, [stations, city, stationParameters]);

  return (
    <main className="main row flex-grow-1">
      {location ? (
        city ? (
          <CardSemInfo
            tituloDoCard={city?.city}
            conteudoDoCard={29}
            unidade="ºC"
            textoDeAjuda=""
          />
        ) : (
          <CardSemInfo
            tituloDoCard="Buscando sua cidade..."
            conteudoDoCard=""
            unidade=""
            textoDeAjuda=""
          />
        )
      ) : (
        <CardSemInfo
          tituloDoCard="Localização não disponível no momento"
          conteudoDoCard=""
          unidade=""
          textoDeAjuda=""
        />
      )}
      {parameters.map((parameter) => (
        <CardComInfo
          tituloDoCard={`${parameter?.parameter_type?.parameter_name}`}
          conteudoDoCard={29} // Replace with actual value
          unidade={`${parameter?.parameter_type?.unit?.unit}`}
          textoDeAjuda="..." // Replace with actual value
        />
      ))}
    </main>
  );
};

export default MainPortal;
