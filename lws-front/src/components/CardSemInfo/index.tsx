import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSnowflake,
  faCloud,
  faCloudSun,
  faSun,
  faWind,
  faDroplet,
  faLocationArrow,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";

type CardProps = {
  tituloDoCard: string;
  conteudoDoCard: string | number;
  unidade: string;
  textoDeAjuda: string;
};

const CardSemInfo: React.FC<CardProps> = ({
  tituloDoCard,
  conteudoDoCard,
  unidade,
  textoDeAjuda,
}) => {
  const [alerta, setAlerta] = useState(null);

  useEffect(() => {
    window.stations3001
      .get("occurrence")
      .then((response) => {
        let lastAlert = null;
        response.data.forEach((occurrence: any) => {
          if (occurrence && occurrence.status_alert === 1) {
            lastAlert = occurrence;
          }
        });
        if (lastAlert) {
          setAlerta(lastAlert);
        }
      })
      .catch((error) => {
        console.error("Ocorreu um erro!", error);
      });
  }, []);

  const getIcon = (temperature: number, titulo: string) => {
    if (titulo === "Temperatura Média") {
      if (temperature >= -1 && temperature <= 10) {
        return faSnowflake;
      } else if (temperature >= 11 && temperature <= 20) {
        return faCloud;
      } else if (temperature >= 21 && temperature <= 25) {
        return faCloudSun;
      } else if (temperature >= 26 && temperature <= 45) {
        return faSun;
      }
    } else if (titulo === "Umidade Relativa") {
      return faDroplet;
    } else if (titulo === "Velocidade do Vento") {
      return faWind;
    } else {
      return faLocationArrow;
    }
  };

  const icon = getIcon(conteudoDoCard, tituloDoCard);

  return (
    <div className="container">
      <div className="card-sem-info">
        <h3>{tituloDoCard}</h3>
        <h1>
          {conteudoDoCard} {unidade}
        </h1>
      </div>
      {alerta ? (
        <div className="new-card">
          <div style={{ display: "flex", alignItems: "center" }}>
            <FontAwesomeIcon
              icon={faExclamationTriangle}
              style={{ marginRight: "10px" }}
            />
            <strong>ATENÇÃO! ALERTA MAIS RECENTE: </strong>
          </div>
          <div>
            <strong>{alerta.alert.description}</strong>
          </div>
          <div>
            Emitido às{" "}
            {new Date(alerta.measure.unixtime * 1000).toLocaleTimeString()} pela
            estação {alerta.alert.station.station_description}
          </div>
        </div>
      ) : (
        <div className="new-card">Sem alertas no momento</div>
      )}
    </div>
  );
};

export default CardSemInfo;
