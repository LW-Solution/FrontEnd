import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import DashCard from "../../components/DashCard";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { GridDataType } from "../../types/dashTypes";
import { BarChart } from "../../components/Charts/BarChart";
import "./style.scss";
import BuscaPortal from "../../components/BuscaPortal";
import LoginPortal from "../../components/LoginPortal";
import NavBarPortal from "../../components/NavBarPortal";
import logo from "../../assets/images/LW_logo_w_light.png";
import TableParams from "../../components/TableParams";

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

const PortalDashboards = () => {
  const [id_station, setIdStation] = useState<string | null>(null);
  const [stations, setStations] = useState<Station[]>([]);
  const [gridData, setGridData] = useState<GridDataType | null>(null);
  const [chartData, setChartData] = useState<(string | number)[][]>([]);
  const [error, setError] = useState<string | null>(null);

  const currentDate = new Date();
  const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(currentDate.getDate()).padStart(2, "0")}`;

  const [startDate, setStartDate] = useState(formattedDate);
  const [endDate, setEndDate] = useState(formattedDate);
  const [displayStartDate, setDisplayStartDate] = useState("");
  const [displayEndDate, setDisplayEndDate] = useState("");
  const [selectedCity, setSelectedCity] = useState<any>(null);

  const sendDate = async () => {
    setError(null); // Reset error before new request
    if (window.stations3001) {
      try {
        const response = await window.stations3001.get(
          `dashboard/bydate/${startDate}/${endDate}/${id_station}`
        );
        // Mapeia as descrições dos parâmetros para suas respectivas unidades
        const parameterUnits: { [key: string]: string } = {};
        response.data.parameter_types.forEach((parameter) => {
          parameterUnits[parameter.description] = parameter.unit.unit;
        });
        // Adiciona as unidades aos dados antes de atualizar o estado
        const dataWithUnits = {
          ...response.data,
          parameterUnits,
        };
        setGridData(dataWithUnits);
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
    if (gridData && gridData.dailyData && gridData.dailyData.length > 0) {
      const parameterNames = Object.keys(
        gridData.dailyData[0].avgParameterValues
      );
      const newChartData = gridData.dailyData.map((data) => {
        const date = new Date(data.date).toISOString();
        const parameterValues = parameterNames.map(
          (parameterName) => data.avgParameterValues[parameterName].avgValue
        );
        return [date, ...parameterValues];
      });
      setChartData([["Date", ...parameterNames], ...newChartData]);
    } else {
      setChartData([]);
    }
  }, [gridData]);

  useEffect(() => {
    sendDate();
  }, []);

  const hasParameters =
    gridData?.dailyData?.[0]?.avgParameterValues &&
    Object.keys(gridData.dailyData[0].avgParameterValues).length > 0;

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
        <Box sx={{ flexGrow: 1, overflow: "auto" }}>
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <Item sx={{ height: "40vh" }}>
                <Stack spacing={1}>
                  <Grid item>
                    <Typography variant="body2">
                      Selecione a Estação:
                    </Typography>
                  </Grid>
                  <Grid item>
                    <FormControl sx={{ minWidth: "100%" }}>
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
                  </Grid>
                  <Grid item>
                    <Typography variant="body2">
                      Selecione o período:
                    </Typography>
                  </Grid>
                  <Grid item>
                    <TextField
                      sx={{ minWidth: "100%" }}
                      id="date-start"
                      label="Data Início"
                      type="date"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      sx={{ minWidth: "100%" }}
                      id="date-end"
                      label="Data Fim"
                      type="date"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </Grid>
                  <Grid item container justifyContent="center">
                    <Button
                      sx={{ minWidth: "100%" }}
                      className="btnExibir"
                      variant="contained"
                      onClick={sendDate}
                    >
                      Exibir
                    </Button>
                  </Grid>
                </Stack>
              </Item>
            </Grid>
            <Grid item xs={2}>
              <Item
                sx={{
                  height: "40vh",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {gridData?.id_estacao ? (
                  <>
                    <h5>ID: {gridData.id_estacao.id_station}</h5>
                    <hr />
                    <p>Nome: {gridData.id_estacao.station_description}</p>
                    <p>Local: {gridData.id_estacao.location.location_name}</p>
                    <p>
                      Aferições:{" "}
                      {gridData.dailyData.reduce(
                        (sum, data) => sum + data.quantityMeasurements,
                        0
                      )}
                    </p>
                  </>
                ) : (
                  <Typography variant="h6" align="center">
                    Nenhuma Estação Selecionada
                  </Typography>
                )}
              </Item>
            </Grid>
            <Grid item xs={8}>
              <Item sx={{ height: "40vh", overflow: "auto" }}>
                <TableParams gridData={gridData} />
              </Item>
            </Grid>

            <Grid item xs={2}>
              <Item sx={{ height: "100%" }} >
                <Grid
                  container
                  sx={{ minHeight: "100%" }}
                  justifyContent="center"
                  alignItems="center"
                  spacing={1}
                >
                  {hasParameters ? (
                    Object.keys(gridData.dailyData[0].avgParameterValues).map(
                      (parameterName, index) => (
                        <Grid
                          item
                          key={parameterName}
                          sx={{ flexGrow: 1, width: "100%" }}
                        >
                          <DashCard
                            title={parameterName}
                            med={
                              gridData.dailyData[0].avgParameterValues[
                                parameterName
                              ].avgValue
                            }
                            min={
                              gridData.dailyData[0].avgParameterValues[
                                parameterName
                              ].minValue
                            }
                            max={
                              gridData.dailyData[0].avgParameterValues[
                                parameterName
                              ].maxValue
                            }
                            unit={gridData.parameter_types[index].unit.unit}
                            onClick={() => {}}
                          />
                        </Grid>
                      )
                    )
                  ) : (
                    <Typography variant="h6" align="center">
                      Não há dados para exibir no período selecionado.
                    </Typography>
                  )}
                </Grid>
              </Item>
            </Grid>
            <Grid item xs={10}>
              <Item sx={{ minHeight: "100%" }}>
                {chartData.length > 1 ? (
                  <BarChart
                    data={chartData}
                    title={`Gráfico do Período: ${displayStartDate} - ${displayEndDate}`}
                  />
                ) : (
                  <Typography variant="h6" align="center">
                    Não há dados para exibir no período selecionado.
                  </Typography>
                )}
              </Item>
            </Grid>
          </Grid>
        </Box>
      </div>
    </>
  );
};

export default PortalDashboards;
