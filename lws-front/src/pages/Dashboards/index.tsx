import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import DashCard from "../../components/DashCard";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { GridDataType } from "../../types/dashTypes";
import { BarChart } from "../../components/Charts/BarChart";
import "./style.scss";

const StationsDashboards = () => {
  const { id_station } = useParams();
  const [gridData, setGridData] = useState<GridDataType | null>(null);
  const [chartData, setChartData] = useState<(string | number)[][]>([]);
  const [error, setError] = useState<string | null>(null);

  const currentDate = new Date();
  const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(currentDate.getDate()).padStart(2, "0")}`;

  const [startDate, setStartDate] = useState(formattedDate);
  const [endDate, setEndDate] = useState(formattedDate);
  const [displayStartDate, setDisplayStartDate] = useState("");
  const [displayEndDate, setDisplayEndDate] = useState("");

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

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Stack spacing={1}>
        <Grid container spacing={1}>
          <Grid item xs={4}>
            {gridData?.id_estacao ? (
              <>
                <p>ID: {gridData.id_estacao.id_station}</p>
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
          </Grid>
          <Grid item xs={8}>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              {hasParameters ? (
                Object.keys(gridData.dailyData[0].avgParameterValues).map(
                  (parameterName, index) => (
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
                  )
                )
              ) : (
                <Typography variant="h6" align="center">
                  Não há dados para exibir no período selecionado.
                </Typography>
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid container>
          <Grid container item xs={2} justifyContent="center">
            <Stack spacing={3}>
              <Grid item>
                <Typography variant="body2">Selecione o período:</Typography>
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
              <Grid item container justifyContent="center" >
                <Button className="btnExibir" variant="contained" onClick={sendDate}>
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
  );
};

export default StationsDashboards;
