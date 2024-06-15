import React from "react";
import "./style.scss";

import NavBarPortal from "../../components/NavBarPortal";
import MainPortal from "../../components/MainPortal";

const Portal: React.FC = () => {
  return (
    <div className="landing-page container-fluid d-flex flex-column h-100">      
      <NavBarPortal />
      <MainPortal />
      <footer className="footer row py-3 text-center">
        <p>&copy; 2024 LW-Solution</p>
      </footer>
    </div>
  );
};

export default Portal;
