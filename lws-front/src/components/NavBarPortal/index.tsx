import React from "react";

const NavBarPortal: React.FC = () => {
  return (
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
        <a className="nav-link mx-2" href="#">
          Fim de semana
        </a>
        <a className="nav-link mx-2" href="#">
          Mensal
        </a>
      </div>
    </nav>
  );
};

export default NavBarPortal;
