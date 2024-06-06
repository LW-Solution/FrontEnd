import React, { useEffect, useState } from "react";
import CardComInfo from "../../components/CardComInfo";
import CardSemInfo from "../../components/CardSemInfo";

const MainPortal: React.FC = () => {
  const [location, setLocation] = useState(null);
  const [city, setCity] = useState("");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });

          const apiKey = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=pt-br`;
          console.log(apiKey);
          fetch(apiKey)
            .then((response) => response.json())
            .then((data) => setCity(data))
            .catch((error) =>
              console.error("Erro ao encontrar nome da cidade: ", error)
            );
          console.log(city);
        },
        (error) => {
          console.error("Erro ao encontrar localização: ", error);
        }
      );
    } else {
      console.warn("Geolocalização não está disponível.");
    }
  }, []);
  return (
    <main className="main row flex-grow-1">
      {location ? (
        city ? (
          <CardSemInfo
            tituloDoCard={city?.city}
            conteudoDoCard={29}
            unidade="ºC"
            textoDeAjuda="A localização é um dado importante para diversos setores, como meteorologia e logística. Ela pode ser obtida por GPS ou por endereço."
          />
        ) : (
          <p>Buscando sua cidade...</p>
        )
      ) : (
        <p>Localização não está disponível.</p>
      )}
      <CardComInfo
        tituloDoCard="Temperatura Média"
        conteudoDoCard={29}
        unidade="ºC"
        textoDeAjuda="A temperatura, medida por termômetros, indica o nível de calor ou frio do ar, influenciando nosso conforto e diversos outros fatores. ️"
      />
      <CardComInfo
        tituloDoCard="Umidade Relativa"
        conteudoDoCard={3}
        unidade="g/m³"
        textoDeAjuda="A umidade relativa, medida por higrômetros, indica a porcentagem de vapor de água no ar em relação ao máximo que ele pode suportar, influenciando nosso conforto e saúde."
      />
      <CardComInfo
        tituloDoCard="Velocidade do Vento"
        conteudoDoCard={5}
        unidade="m/s"
        textoDeAjuda="A velocidade do vento, medida por anemômetros, revela o quão rápido o ar se move. Essa informação é crucial para diversas áreas, desde a meteorologia até a geração de energia eólica."
      />
    </main>
  );
};

export default MainPortal;
