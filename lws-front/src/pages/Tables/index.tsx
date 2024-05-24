import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TableParams from "../../components/TableParams";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import * as React from "react";
import { useEffect, useState } from "react";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

interface Station {
    id_station: number;
    station_description: string;
    station_mac_address: string;
    location: {
      id_location: number;
      location_name: string;
      latitude: string;
      longitude: string;
    };
  }

export default function TablesPage() {
  const [age, setAge] = React.useState("");
  const [stations, setStations] = useState<Station[]>([]);

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
    setAge(event.target.value);
  };
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{ display: "flex" }}>
          <Grid item xs={4} sx={{ minHeight: 120 }}>
            <Item>
              <FormControl sx={{ minWidth: 200 }}>
                <InputLabel>Estações</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={age}
                  onChange={handleChange}
                  label="Estacoes"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {stations.map((stations) => (
                    <MenuItem
                      key={stations.id_station}
                      value={stations.id_station}
                    >
                      {stations.station_description}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Item>
          </Grid>
          <Grid item xs={8}>
            <Item>xs=4</Item>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <TableParams />
        </Grid>
      </Grid>
    </>
  );
}
