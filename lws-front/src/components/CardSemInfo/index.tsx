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
  const getIcon = (temperature: number, titulo: string) => {
    if (titulo == "Temperatura Média") {
      if (temperature >= -1 && temperature <= 10) {
        return faSnowflake;
      } else if (temperature >= 11 && temperature <= 20) {
        return faCloud;
      } else if (temperature >= 21 && temperature <= 25) {
        return faCloudSun;
      } else if (temperature >= 26 && temperature <= 45) {
        return faSun;
      }
    } else if (titulo == "Umidade Relativa") {
      return faDroplet;
    } else if (titulo == "Velocidade do Vento") {
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
      <div className="new-card">Alerta de Tempestade</div>
    </div>
  );
};

export default CardSemInfo;
