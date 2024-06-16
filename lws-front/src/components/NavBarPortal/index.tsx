import React from "react";
import { Link } from "react-router-dom"; // Importe o Link de react-router-dom

const NavBarPortal: React.FC = () => {
  return (
    <>
      <nav
        className="menu row py-2 align-items-center mb-2"
        style={{ backgroundColor: "#89A7B1" }}
      >
        <div className="d-flex flex-row justify-content-center px-5">
          <Link className="nav-link mx-5" to="/">
            Home
          </Link>          
          <Link className="nav-link mx-5" to="/dash">
            Dashboards
          </Link>          
          <Link className="nav-link mx-5" to="/tables">
            Tabelas
          </Link>
        </div>
      </nav>
    </>
  );
};

export default NavBarPortal;
