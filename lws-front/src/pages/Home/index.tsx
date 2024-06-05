import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  
  faUserGroup,
  faSatellite,
  faCloudRain,
  faFileLines,
  faTriangleExclamation,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function Portal() {
  const buttons = () => {
    const options = [
      
      {
        link: "/admin/users",
        name: "USUÁRIOS",
        icon: <FontAwesomeIcon icon={faUserGroup} />,
      },
      {
        link: "/admin/stations",
        name: "ESTAÇÕES",
        icon: <FontAwesomeIcon icon={faSatellite} />,
      },
      {
        link: "/admin/params",
        name: "PARÂMETROS",
        icon: <FontAwesomeIcon icon={faCloudRain} />,
      },
      {
        link: "/admin/reports",
        name: "RELATÓRIOS",
        icon: <FontAwesomeIcon icon={faFileLines} />,
      },
      {
        link: "/admin/alerts",
        name: "ALERTAS",
        icon: <FontAwesomeIcon icon={faTriangleExclamation} />,
      },
      {
        link: "/",
        name: "SAIR",
        icon: <FontAwesomeIcon icon={faRightToBracket} />,
      },
    ];

    return options.map((opt, index) => (            
      <div className="col-4 mb-5 align-items-center justify-content-center" key={index}>
        <Link to={opt.link} className="btn btn-secondary text-start p-3 shadow d-flex align-items-center justify-content-center" >
          <div className="d-flex flex-column align-items-center justify-content-center">
            <div className="mb-3">{opt.icon}</div>
            <div>{opt.name}</div>
          </div>
        </Link>
      </div>          
    ));
  };

  return (
    <>
      <div className="container">
        <h2 className="mb-2">Bem Vindo a LW Solution!</h2>
      <div className="row justify-content-center">
        {buttons()}        
      </div>
    </div>
    </>
  );
}
