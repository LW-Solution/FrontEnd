import { Navigate } from "react-router-dom";
import Alerts from "../pages/Alerts";
import ParameterType from "../pages/ParameterType";
import Params from "../pages/Params";
import Reports from "../pages/Reports";
import Stations from "../pages/Stations";
import Template from "../Template";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Users from "../pages/Users";
import StationsDashboards from "../pages/Dashboards";
import path from "path";

export default[    
        {
            path: "/admin",
            element:<Template/>,
            children: [
                {
                    path: "/admin",
                    element: <Home />,
                    handle: { title: "HOME" }
                },
                {
                    path: "/admin/users",
                    element: <Users />,
                    handle: { title: "USUÁRIOS" }
                },
                {
                    /* path: "/admin/location",
                    element: <Location />,
                    handle: { title: "LOCALIZAÇÃO" } */
                },               
                {
                    path: "/admin/stations",
                    element: <Stations />,
                    handle: { title: "ESTAÇÕES" }
                },
                {
                    /* path: "/admin/unit",
                    element: <Unit />,
                    handle: { title: "UNIDADES" } */
                },
                {
                    path: "/admin/parameter-type",
                    element: <ParameterType />,
                    handle: { title: "TIPOS DE PARÂMETROS" }
                },
                {
                    path: "/admin/params",
                    element: <Params />,
                    handle: { title: "PARÂMETROS" }
                },
                {
                    path: "/admin/reports",
                    element: <Reports />,
                    handle: { title: "RELATÓRIOS" }
                },
                {
                    path: "/admin/alerts",
                    element: <Alerts />,
                    handle: { title: "ALERTAS" }
                },
                {
                    path: "/admin/dashboard/:id_station",
                    element: <StationsDashboards />,
                    handle: { title: "DASHBOARD" }
                },
            ]
        },
        {
            path: "/",
            element: <Login />,
          },
        {
            path: "*",
            element: <Navigate to={"/"} replace={true} />,
        },
    
    ]