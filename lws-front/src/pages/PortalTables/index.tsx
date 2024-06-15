// src/pages/dashboard/PortalTable.jsx
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import PortalTableParams from "../../components/PortalTableParams";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import NavBarPortal from "../../components/NavBarPortal";
import { NewGridDataType, Station } from "../../types/groupHour";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function PortalTable() {
  const [id_station, setIdStation] = useState<string | null>(null);
  const [stations, setStations] = useState<Station[]>([]);

  const currentDate = new Date();
  const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(currentDate.getDate()).padStart(2, "0")}`;

  const [startDate, setStartDate] = useState(formattedDate);
  const [endDate, setEndDate] = useState(formattedDate);
  const [displayStartDate, setDisplayStartDate] = useState("");
  const [displayEndDate, setDisplayEndDate] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [gridData, setGridData] = useState<NewGridDataType | null>(null);

  const sendDate = async () => {
    setError(null); // Reset error before new request
    if (window.stations3001) {
      try {
        const response = await window.stations3001.get(
          `dashboard/bydate/grouphour/${startDate}/${endDate}/${id_station}`
        );

        // Ajustar dados recebidos para o novo formato
        const gridData = response.data as NewGridDataType;

        setGridData(gridData);
        setDisplayStartDate(new Date(startDate).toLocaleDateString());
        setDisplayEndDate(new Date(endDate).toLocaleDateString());
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data. Please try again later.");
      }
    } else {
      console.error("stations3001 is not defined on window");
      setError("Configuration error. Please contact support.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await window.stations3001.get("station");
        setStations(response.data);
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    setIdStation(String(event.target.value));
  };

  return (
    <>
      <NavBarPortal />
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{ display: "flex" }}>
          <Grid item xs={3} sx={{ marginRight: 1 }}>
            <Item>
              <FormControl sx={{ minWidth: 200 }}>
                <InputLabel>Estações</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={id_station || ""}
                  onChange={handleChange}
                  label="Estações"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {stations.map((station) => (
                    <MenuItem
                      key={station.id_station}
                      value={station.id_station}
                    >
                      {station.station_description}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Item>
          </Grid>
          <Grid item xs={3} sx={{ marginRight: 1 }}>
            <Item>
              <TextField
                id="date-start"
                label="Start Date"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </Item>
          </Grid>
          <Grid item xs={3} sx={{ marginRight: 1 }}>
            <Item>
              <TextField
                id="date-end"
                label="End Date"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </Item>
          </Grid>
          <Grid
            item
            xs={3}
            container
            alignItems="center"
            justifyContent="center"
          >
            <Button
              className="btnExibir"
              variant="contained"
              onClick={sendDate}
            >
              Exibir
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <PortalTableParams gridData={gridData} />
        </Grid>
      </Grid>
    </>
  );
}