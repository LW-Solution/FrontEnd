import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSnowflake,
  faCloud,
  faCloudSun,
  faSun,
  faWind,
  faMoon,
  faDroplet,
  faLocationArrow,
} from "@fortawesome/free-solid-svg-icons";
import { WiMoonAltNew, WiMoonAltFull } from "react-icons/wi";
import { GiLightProjector } from "react-icons/gi";
import { FaLightbulb } from "react-icons/fa";
import { IoFlashlight } from "react-icons/io5";

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
    } else if (titulo == "Luminosidade") {
      if (temperature >= 32000) {
        return faSun;
      } else if (temperature >= 10000 && temperature <= 25000) {
        return WiMoonAltFull;
      } else if (temperature >= 1000 && temperature <= 9999) {
        return GiLightProjector;
      } else if (temperature >= 400 && temperature <= 999) {
        return FaLightbulb;
      } else if (temperature >= 320 && temperature <= 399) {
        return IoFlashlight;
      } else if (temperature >= 0 && temperature <= 321) {
        return faMoon;
      } else {
        return WiMoonAltNew;
      }
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
        <button
          className="question-button"
          onMouseEnter={() => { setIsHovered(true); setHoveredElement('question'); }}
          onMouseLeave={() => { setIsHovered(false); setHoveredElement(''); }}
        >
          ?
        </button>
        <button
          className="exclamation-button"
          onMouseEnter={() => { setIsHovered(true); setHoveredElement('exclamation'); }}
          onMouseLeave={() => { setIsHovered(false); setHoveredElement(''); }}
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
          {
            icon == WiMoonAltFull ? <WiMoonAltFull style={{ width: '60px', height: '80px' }}/> :
            icon == GiLightProjector ? <GiLightProjector style={{ width: '60px', height: '80px' }}/> :
            icon == FaLightbulb ? <FaLightbulb style={{ width: '60px', height: '80px' }}/> :
            icon == IoFlashlight ? <IoFlashlight style={{ width: '60px', height: '80px' }}/> :
            icon == WiMoonAltNew ? <WiMoonAltNew style={{ width: '60px', height: '80px' }}/> :
            <FontAwesomeIcon icon={icon} size="5x" />
          }
        </div>
      </div>
    </div>
  );
};

export default CardComInfo;
