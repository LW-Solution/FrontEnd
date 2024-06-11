import "./style.scss";
import DateTime from "../DateTime";
import { useState, useEffect, SetStateAction } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

interface HeaderProps {
  title: string;
}

export default function Header(props: HeaderProps) {
  const { title } = props;

  const [occurrence, setOccurrence] = useState({});
  const [currentOccurrence, setCurrentOccurrence] = useState(null);

  useEffect(() => {
    window.stations3001
      .get("occurrence")
      .then((response) => {
        setOccurrence(response.data);
        let lastAlert = null;
        response.data.forEach(
          (occurrence: SetStateAction<null>, index: number) => {
            if (occurrence && occurrence.status_alert === 1) {
              lastAlert = occurrence;
            }
          }
        );
        if (lastAlert) {
          setCurrentOccurrence(lastAlert);
        }
      })
      .catch((error) => {
        console.error("Ocorreu um erro!", error);
      });
  }, [occurrence]);
  
  return (
    <div className="header d-flex justify-content-between">
      <h2>{title}</h2>
      {currentOccurrence && (
        <div
          style={{
            backgroundColor: "#F4792B",
            color: "white",
            padding: "10px",
            borderRadius: "5px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <FontAwesomeIcon
              icon={faExclamationTriangle}
              style={{ marginRight: "10px" }}
            />
            <strong>ATENÇÃO! ALERTA MAIS RECENTE: </strong>
          </div>
          <div>
            <strong> {currentOccurrence.alert.description} </strong>
          </div>
          <div>
            Emitido às{" "}
            {new Date(
              currentOccurrence.measure.unixtime * 1000
            ).toLocaleTimeString()}{" "}
            pela estação {currentOccurrence.alert.station.station_description}
          </div>
        </div>
      )}
      <DateTime />
    </div>
  );
}
