import { Link, useNavigate } from "react-router-dom";
import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faUserGroup,
  faSatellite,
  faCloudRain,
  faFileLines,
  faTriangleExclamation,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";

export default function Sidebar() {
  const buttons = () => {
    const options = [
      {
        link: "/admin",
        name: "HOME",
        icon: <FontAwesomeIcon icon={faHouse} />,
      },
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
    ];

    return options.map((opt) => (
      <Link to={opt.link} className="d-flex btn text-start py-3" key={opt.name}>
        <span className="me-3">{opt.icon}</span>
        <span>{opt.name}</span>
      </Link>
    ));
  };

  const navigate = useNavigate();
  const logout = () => {
    navigate("/login");
  };

  return (
    <>
      <div className="sidebar p-2 d-flex flex-column">
        {buttons()}
        <a
          onClick={logout}
          className="sair d-flex btn text-start py-3 mt-auto justify-content-between"
        >
          SAIR
          <span>
            <FontAwesomeIcon icon={faRightToBracket} />
          </span>
        </a>
      </div>
    </>
  );
}
