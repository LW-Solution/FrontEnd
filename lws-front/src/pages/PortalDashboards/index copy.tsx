import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import DashCard from "../../components/DashCard";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
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
        setGridData(response.data);
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
        <Box sx={{ flexGrow: 1 }}>
          <Stack spacing={1}>
            <Grid container spacing={1}>
              <Grid item xs={2}>
                <Card>
                  <CardContent>
                    {gridData?.id_estacao ? (
                      <>
                        <p>ID: {gridData.id_estacao.id_station}</p>
                        <p>Nome: {gridData.id_estacao.station_description}</p>
                        <p>
                          Local: {gridData.id_estacao.location.location_name}
                        </p>
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
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={10}>
                <Card>
                  <CardContent>
                    <Grid
                      container
                      justifyContent="center"
                      alignItems="center"
                      spacing={2}
                    >
                      {hasParameters ? (
                        Object.keys(
                          gridData.dailyData[0].avgParameterValues
                        ).map((parameterName, index) => (
                          <Grid item key={parameterName}>
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
                        ))
                      ) : (
                        <Typography variant="h6" align="center">
                          Não há dados para exibir no período selecionado.
                        </Typography>
                      )}
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <Grid container>              
              <Grid container item xs={2} justifyContent="center">
                <Stack spacing={3}>
                  
                  <Grid item>
                    <Typography variant="body2">
                      Selecione a Estação:
                    </Typography>
                  </Grid>
                  <Grid item>
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
                  </Grid>
                  <Grid item>
                    <Typography variant="body2">
                      Selecione o período:
                    </Typography>
                  </Grid>
                  <Grid item>
                    <TextField
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
                      className="btnExibir"
                      variant="contained"
                      onClick={sendDate}
                    >
                      Exibir
                    </Button>
                  </Grid>
                </Stack>
              </Grid>
              <Grid item xs={10}>
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
              </Grid>
            </Grid>
            {error && (
              <Typography variant="h6" color="error" align="center">
                {error}
              </Typography>
            )}
          </Stack>
        </Box>
      </div>
    </>
  );
};

export default PortalDashboards;
