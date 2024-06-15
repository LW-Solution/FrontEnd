import React from "react";
import BuscaPortal from "../BuscaPortal";
import LoginPortal from "../LoginPortal";
import logo from "../../assets/images/LW_logo_w_light.png";

const NavBarPortal: React.FC = () => {
  return (
    <>
    <header className="header-portal row py-3 align-items-center">
        <div className="logo col-md-3 d-flex align-items-center">
          <img src={logo} alt="logo" />
        </div>
        <BuscaPortal />
        <LoginPortal />
      </header>
    <nav
      className="menu row py-2 align-items-center"
      style={{ backgroundColor: "#89A7B1" }}
    >
      <div className="d-flex flex-row justify-content-between px-5">
        <a className="nav-link mx-2" href="#">
          Agora
        </a>
        <a className="nav-link mx-2" href="#">
          A cada hora
        </a>
        <a className="nav-link mx-2" href="#">
          10 dias
        </a>
        {/* <a className="nav-link mx-2" href="#">
          Fim de semana
        </a> */}
        <a className="nav-link mx-2" href="#">
          Tabelas
        </a>
      </div>
    </nav>
    </>
  );
};

export default NavBarPortal;
