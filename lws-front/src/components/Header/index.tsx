import { useLocation } from "react-router-dom";
import "./style.scss"
import DateTime from "../DateTime";


interface HeaderProps {
  title: string;
}

export default function Header(props: HeaderProps) {
  const { title } = props;
/*   const location = useLocation();
  const homeAdmin = [`/admin`];

  const esconderBotaoAdmin = homeAdmin.includes(location.pathname);

  const voltar = () => {
    window.history.back();
  }; */

  return (
    <div className="header d-flex justify-content-between">
      <h2>{title}</h2>
      <DateTime />     
{/*       <div className="d-flex">
        {!esconderBotaoAdmin && (
          <button
            type="button"
            className="btn btn-outline-dark ms-2 d-flex align-items-center fw-bold"
            onClick={voltar}
          >
            VOLTAR
            <i className="fa-solid fa-reply-all ms-2 fa-1 x"></i>
          </button>
        )}
      </div> */}
    </div>
  );
}
