import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSnowflake, faCloud, faCloudSun, faSun, faWind, faDroplet, faLocationArrow } from "@fortawesome/free-solid-svg-icons";

type CardProps = {
  tituloDoCard: string;
  conteudoDoCard: number;
  unidade: string;
  textoDeAjuda: string;
};

const CardComInfo: React.FC<CardProps> = ({ tituloDoCard, conteudoDoCard, unidade, textoDeAjuda }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getIcon = (temperature: number, titulo: string) => {
    console.log(temperature, titulo)
    if (titulo == 'Temperatura Média') {
      if (temperature >= -1 && temperature <= 10) {
        return faSnowflake;
      } else if (temperature >= 11 && temperature <= 20) {
        return faCloud;
      } else if (temperature >= 21 && temperature <= 25) {
        return faCloudSun;
      } else if (temperature >= 26 && temperature <= 45) {
        return faSun;
      }
    } else if (titulo == 'Umidade Relativa') { 
      return faDroplet;
    } else if (titulo == 'Velocidade do Vento'){
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
        <h1>{conteudoDoCard}{" "}{unidade}</h1>
        
        <button
          className="question-button"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          ?
        </button>
        {isHovered && (
          <div style={{
            position: 'absolute',
            right: 0,
            top: '50%',
            width: '42.5%',
            height: '123px',
            transform: 'translate(102.5%, -57%)',
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            padding: '5px 10px',
            margin: '10px 0',
            borderRadius: '5px',
          }}>
            <p>{textoDeAjuda}</p>
          </div>
        )}
        <div className="icon"><FontAwesomeIcon icon={icon} size="5x" /></div>
      </div>
    </div>
  );
};

export default CardComInfo;
