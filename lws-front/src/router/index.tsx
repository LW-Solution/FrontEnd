import { Navigate } from "react-router-dom";
import Alerts from "../pages/Alerts";
import Unit from "../pages/Units";
import Location from "../pages/Locations";
import ParameterType from "../pages/ParameterType";
import Params from "../pages/Params";
import Stations from "../pages/Stations";
import Template from "../Template";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Users from "../pages/Users";
import StationsDashboards from "../pages/Dashboards";
import TablesPage from "../pages/Tables";
import Portal from "../pages/Portal";
import PortalTables from "../pages/PortalTables";
import PortalDashboards from "../pages/PortalDashboards";

export default [
    {
        path: "/admin",
        element: <Template />,
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
                path: "/admin/location",
                element: <Location />,
                handle: { title: "LOCALIZAÇÃO" }
            },
            {
                path: "/admin/stations",
                element: <Stations />,
                handle: { title: "ESTAÇÕES" }
            },
            {
                path: "/admin/unit",
                element: <Unit />,
                handle: { title: "UNIDADES" }
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
                element: <TablesPage />,
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
            }
        ]
    },
    /* {
        path: "/",
        element: <Login />,
    }, */
    {
        path: "/",
        element: <Portal />,
    },
    {
        path: "/tables",
        element: <PortalTables />,
    },
    {
        path: "/dash",
        element: <PortalDashboards />,
    },
    {
        path: "*",
        element: <Navigate to={"/"} replace={true} />,
    },

]