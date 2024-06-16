import React, { useState } from "react";
import "./style.scss";

import NavBarPortal from "../../components/NavBarPortal";
import MainPortal from "../../components/MainPortal";
import BuscaPortal from "../../components/BuscaPortal";
import LoginPortal from "../../components/LoginPortal";
import logo from "../../assets/images/LW_logo_w_light.png";
import { Link } from "react-router-dom";

const Portal: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<any>(null);

  return (
    <div className="landing-page container-fluid d-flex flex-column h-100">
      <header className="header-portal row py-3 align-items-center">
        <div className="logo col-md-3 d-flex align-items-center">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <BuscaPortal setSelectedCity={setSelectedCity} />
        <LoginPortal />
      </header>
      <NavBarPortal />
      <MainPortal selectedCity={selectedCity} />
      <footer className="footer row py-3 text-center">
        <p>&copy; 2024 LW-Solution</p>
      </footer>
    </div>
  );
};

export default Portal;
