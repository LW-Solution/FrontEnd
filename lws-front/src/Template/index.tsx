import { Outlet } from "react-router";
import "./style.scss";

import { useMatches } from "react-router-dom";

import logo from "@/assets/images/LW_logo_w_light.png";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function Template() {
  const matches = useMatches();
  const title = matches.slice(-1)[0]?.handle?.title || "HOME";  

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
