import { useLocation } from "react-router-dom";
import "./style.scss";
import DateTime from "../DateTime";
import { useState, useEffect, SetStateAction } from "react";
import axios from "axios";

interface HeaderProps {
  title: string;
}

export default function Header(props: HeaderProps) {
  const { title } = props;
  /*   const location = useLocation();
  const homeAdmin = [`/admin`];

  const esconderBotaoAdmin = homeAdmin.includes(location.pathname);

  const voltar = () => {
    window.history.back();
  }; */

  const [occurrence, setOccurrence] = useState({});
  const [currentOccurrence, setCurrentOccurrence] = useState(null);

  useEffect(() => {
    window.stations3001
      .get("occurrence")
      .then((response) => {
        setOccurrence(response.data);
        response.data.forEach((occurrence: SetStateAction<null>, index: number) => {
          if (occurrence && occurrence.status_alert === 1) {
            setTimeout(() => {
              setCurrentOccurrence(occurrence);
              setTimeout(() => {
                setCurrentOccurrence(null);
              }, 10000);
            }, index * 10000);
          }
        });
      })
      .catch((error) => {
        console.error("Ocorreu um erro!", error);
      });
  }, []);

  console.log(occurrence);
  return (
    <div className="header d-flex justify-content-between">
      <h2>{title}</h2>
      {currentOccurrence && (
        <div>
          <strong>ATENÇÃO! </strong>
          <strong> {currentOccurrence.alert.description} </strong>
          <br />
          Emitido às {" "}
          {new Date(
            currentOccurrence.measure.unixtime * 1000
          ).toLocaleTimeString()}
          {" "} pela estação {" "}
          {currentOccurrence.alert.station.station_description}
        </div>
      )}
      <DateTime />
      {/*       <div className="d-flex">
        {!esconderBotaoAdmin && (
          <button
            type="button"
            className="btn btn-outline-dark ms-2 d-flex align-items-center fw-bold"
            onClick={voltar}
          >
            VOLTAR
            <i className="fa-solid fa-reply-all ms-2 fa-1 x"></i>
          </button>
        )}
      </div> */}
    </div>
  );
}
