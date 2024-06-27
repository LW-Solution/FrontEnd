import React, { useEffect, useState } from "react";
import CardComInfo from "../../components/CardComInfo";
import CardSemInfo from "../../components/CardSemInfo";

interface MainPortalProps {
  selectedCity: any;
}

const MainPortal: React.FC<MainPortalProps> = ({ selectedCity }) => {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [city, setCity] = useState<string | null>(null);
  const [stations, setStations] = useState([]);
  const [foundStation, setFoundStation] = useState<any>(null);
  const [parametersData, setParametersData] = useState([]);

  useEffect(() => {
    if (selectedCity) {
      setCity(selectedCity.label);
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });

          const apiKey = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=pt-br`;
          fetch(apiKey)
            .then((response) => response.json())
            .then((data) => setCity(data.city))
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
  }, [selectedCity]);

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
    if (stations && city) {
      const station = stations.find(
        (station) => station.station_description === city
      );

      if (station) {
        setFoundStation(station);
      } else {
        console.log("Nenhuma estação correspondente encontrada para:", city);
      }
    }
  }, [stations, city]);

  useEffect(() => {
    const fetchData = async () => {
      if (foundStation) {
        try {
          const response = await window.stations3001.get(
            `station/parameters/${foundStation.id_station}`
          );
          setParametersData(response.data);
        } catch (error) {
          console.error("Erro na requisição:", error);
        }
      }
    };
    fetchData();
  }, [foundStation]);

  const getHelpText = (parameterName) => {
    switch (parameterName) {
      case "Temperatura":
        return "A medição da temperatura é realizada utilizando termômetros, que podem ser digitais ou analógicos. A temperatura é uma medida do grau de calor ou frio de um objeto ou ambiente, e pode ser expressa em graus Celsius (°C).";
      case "Umidade":
        return "A umidade é medida usando higrômetros, que podem ser mecânicos, eletrônicos ou psicrômetros. Ela indica a quantidade de vapor de água presente no ar em comparação com a quantidade máxima que o ar tem a uma certa temperatura.";
      case "Vento":
        return "A velocidade do vento é medida com anemômetros, que podem ser de copos, de hélice ou ultrassônicos. Geralmente expressa em metros por segundo (m/s) ou quilômetros por hora (km/h) e indica a força com que o vento está se movendo.";
      case "Luminosidade":
        return "A luminosidade é medida em lux (lx) usando luxímetros. Ela indica a intensidade da luz em uma determinada área e é importante para avaliar condições de iluminação em ambientes internos e externos.";
      case "Precipitação":
        return "A precipitação é medida usando pluviômetros, que registram a quantidade de chuva em milímetros (mm). Ela indica o volume de água que caiu em uma determinada área em um período de tempo.";
      default:
        return "";
    }
  };

  const getHealthText = (parameterName) => {
    switch (parameterName) {
      case "Temperatura":
        return "Exposição a temperaturas extremas pode causar problemas de saúde. Em temperaturas muito altas, há risco de insolação e desidratação, enquanto temperaturas muito baixas podem levar à hipotermia. Verifique sempre a temperatura.";
      case "Umidade":
        return "A umidade alta pode dificultar a transpiração e a regulação da temperatura corporal, aumentando o risco de hipertermia e problemas respiratórios. Já a umidade muito baixa pode causar ressecamento da pele e desconforto nas vias respiratórias.";
      case "Vento":
        return "Ventos fortes podem aumentar a sensação térmica de frio, mesmo em temperaturas moderadas. Além disso, ventos intensos podem transportar poluentes e alérgenos, exacerbando condições respiratórias como asma e alergias.";
      case "Luminosidade":
        return "Exposição excessiva à luminosidade, especialmente à luz solar direta, pode causar problemas de saúde como queimaduras solares e danos oculares. O uso de protetor solar e óculos de sol é recomendado para proteção.";
      case "Precipitação":
        return "Podem causar inundações e deslizamentos de terra, representando riscos significativos à saúde e segurança. Mantenha-se informado e seguir as recomendações das autoridades em casos de chuvas fortes.";
      default:
        return "";
    }
  };

  return (
    <main className="main row flex-grow-1">
      {city ? (
        <CardSemInfo
          tituloDoCard={city}
          conteudoDoCard={foundStation?.principalSubdivision || ""}
          unidade={foundStation?.countryName || ""}
          textoDeAjuda=""
        />
      ) : (
        <CardSemInfo
          tituloDoCard="Selecione uma cidade ou permita acesso à localização..."
          conteudoDoCard=""
          unidade=""
          textoDeAjuda=""
        />
      )}
      {parametersData.map((parameter) => (
        <CardComInfo
          key={parameter.id}
          tituloDoCard={`${parameter?.parameter_name}`}
          conteudoDoCard={`${parameter?.measure[0]?.value || 0}`}
          unidade={`${parameter?.unit}`}
          textoDeAjuda={getHelpText(parameter?.parameter_name)}
          textoDeSaude={getHealthText(parameter?.parameter_name)}
        />
      ))}
    </main>
  );
};

export default MainPortal;
