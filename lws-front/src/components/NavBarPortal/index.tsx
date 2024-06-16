import React from "react";
import { Link } from "react-router-dom"; // Importe o Link de react-router-dom

const NavBarPortal: React.FC = () => {
  return (
    <>
      <nav
        className="menu row py-2 align-items-center mb-2"
        style={{ backgroundColor: "#89A7B1" }}
      >
        <div className="d-flex flex-row justify-content-between px-5">
          <Link className="nav-link mx-2" to="/">
            Agora
          </Link>
          <Link className="nav-link mx-2" to="/">
            A cada hora
          </Link>
          <Link className="nav-link mx-2" to="/">
            10 dias
          </Link>
          {/* <Link className="nav-link mx-2" to="/">
            Fim de semana
          </Link> */}
          <Link className="nav-link mx-2" to="/tables">
            Tabelas
          </Link>
        </div>
      </nav>
    </>
  );
};

export default NavBarPortal;
