import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSnowflake,
  faCloud,
  faCloudSun,
  faSun,
  faWind,
  faDroplet,
  faLocationArrow,
} from "@fortawesome/free-solid-svg-icons";

type CardProps = {
  tituloDoCard: string;
  conteudoDoCard: number;
  unidade: string;
  textoDeAjuda: string;
  textoDeSaude: string;
};

const CardComInfo: React.FC<CardProps> = ({
  tituloDoCard,
  conteudoDoCard,
  unidade,
  textoDeAjuda,
  textoDeSaude,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredElement, setHoveredElement] = useState('');

  const getIcon = (temperature: number, titulo: string) => {
    if (titulo == "Temperatura") {
      if (temperature >= -1 && temperature <= 10) {
        return faSnowflake;
      } else if (temperature >= 11 && temperature <= 20) {
        return faCloud;
      } else if (temperature >= 21 && temperature <= 25) {
        return faCloudSun;
      } else if (temperature >= 26 && temperature <= 45) {
        return faSun;
      }
    } else if (titulo == "Umidade") {
      return faDroplet;
    } else if (titulo == "Vento") {
      return faWind;
    } else {
      return faLocationArrow;
    }
  };

  const icon = getIcon(conteudoDoCard, tituloDoCard);

  return (
    <div>
      <div className="card">
        <h3>{tituloDoCard}</h3>
        <h1>
          {conteudoDoCard} {unidade}
        </h1>
        //
        <button
          className="question-button"
          onMouseEnter={() => {setIsHovered(true); setHoveredElement('question');}}
          onMouseLeave={() => {setIsHovered(false); setHoveredElement('');}}
        >
          ?
        </button>
        <button
          className="exclamation-button"
          onMouseEnter={() => {setIsHovered(true); setHoveredElement('exclamation');}}
          onMouseLeave={() => {setIsHovered(false); setHoveredElement('');}}
        >
          i
        </button>
        {isHovered && (
          <div
            style={{
              position: "absolute",
              right: 0,
              top: "50%",
              width: "42.5%",
              height: "123px",
              transform: "translate(102.5%, -57%)",
              backgroundColor: "#fff",
              border: "1px solid #ccc",
              padding: "5px 10px",
              margin: "10px 0",
              borderRadius: "5px",
            }}
          >
            <p>{hoveredElement == "question" ? textoDeAjuda : textoDeSaude}</p>
          </div>
        )}
        <div className="icon">
          <FontAwesomeIcon icon={icon} size="5x" />
        </div>
      </div>
    </div>
  );
};

export default CardComInfo;
