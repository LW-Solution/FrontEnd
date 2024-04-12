import { Outlet } from "react-router";
import "./style.scss";

import { useMatches, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";

import logo from "@/assets/images/LW_logo_w_light.png";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import GenericButton from "../components/Button";

export default function Template() {
  const matches = useMatches();
  const title = matches.slice(-1)[0]?.handle?.title || "HOME";

  const navigate = useNavigate();
  const logout = () => {
    navigate("/login");
  };

  return (
    <>
      <div className="app">
        <div className="logo d-flex align-items-center">
          <img src={logo} alt="logo Lw Solutions" />
        </div>
        <Header title={title} />
        <Sidebar />
        <div className="wrapper">          
          <Outlet />
        </div>
      </div>
    </>
  );
}
