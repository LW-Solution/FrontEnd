import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import DashCard from "../../components/DashCard";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { faCloudRain } from "@fortawesome/free-solid-svg-icons";
import { Box, Stack, TextField, Typography } from "@mui/material";
import { GridDataType /* DailyData */ } from "../../types/dashTypes";
import { LineChart } from "../../components/Charts/LineChart";
import "./style.scss";

const StationsDashboards = () => {
  const { id_station } = useParams();
  const [gridData, setGridData] = useState<GridDataType | null>(null);
  /* const [filteredData, setFilteredData] = useState<DailyData | null>(null); */
  const [chartData, setChartData] = useState<(string | number)[][]>([]);

  const currentDate = new Date();
  const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(currentDate.getDate()).padStart(2, "0")}`;

  const [startDate, setStartDate] = useState(formattedDate);
  const [endDate, setEndDate] = useState(formattedDate);

  const sendDate = async () => {
    if (window.stations3001) {
      try {
        const response = await window.stations3001.get(
          `dashboard/bydate/${startDate}/${endDate}/${id_station}`
        );
        setGridData(response.data);
      } catch (error) {
        console.error("Erro da requisição:", error);
      }
    } else {
      console.error("stations3001 não está definido em window");
    }
  };

  /*    function handleClick(parameterName: string) {
    if (gridData && gridData.dailyData) {
      const dailyData = gridData.dailyData[0];
      const avgParameterValues = {
        [parameterName]: dailyData.avgParameterValues[parameterName],
      };
      const measurements = dailyData.measurements.filter(
        (measurement) =>
          measurement.parameter_type.parameter_name === parameterName
      );
      const newFilteredData = {
        ...dailyData,
        avgParameterValues,
        measurements,
      };
      setFilteredData(newFilteredData);
    }
  }  */

  useEffect(() => {
    if (gridData && gridData.dailyData && gridData.dailyData[0]) {
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
      setChartData([["Data", ...parameterNames], ...newChartData]);
    } else {
      setChartData([]);
    }
  }, [gridData]);

  useEffect(() => {
    sendDate();
  }, [endDate, id_station, startDate]);

  const hasParameters = gridData && gridData.dailyData && gridData.dailyData[0] && Object.keys(gridData.dailyData[0].avgParameterValues).length > 0;


  return (
    <Box sx={{ flexGrow: 1 }}>
      <Stack spacing={1}>
        <Grid container spacing={1}>
        <Grid item xs={4}>
            {gridData && gridData.id_estacao ? (
              <>
                <p>ID: {gridData.id_estacao.id_station}</p>
                <p>Nome: {gridData.id_estacao.station_description}</p>
                <p>
                  Localização: {gridData.id_estacao.location.location_name} - (
                  {gridData.id_estacao.location.latitude},{" "}
                  {gridData.id_estacao.location.longitude})
                </p>
                <p>
                  Aferições:{" "}
                  {gridData.dailyData.reduce(
                    (sum: number, data: { quantityMeasurements: number }) =>
                      sum + data.quantityMeasurements,
                    0
                  )}
                </p>
              </>
            ) : (
              <Typography variant="h6" align="center">
                Nenhuma estação selecionada.
              </Typography>
            )}
          </Grid>
          <Grid item xs={8}>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              {gridData &&
              gridData.dailyData &&
              gridData.dailyData[0] &&
              Object.keys(gridData.dailyData[0].avgParameterValues).length >
                0 ? (
                Object.keys(gridData.dailyData[0].avgParameterValues).map(
                  (parameterName) => (
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
                        onClick={() => {}}
                        /* onClick={() => handleClick(parameterName)} */
                      />
                    </Grid>
                  )
                )
              ) : (
                <Typography variant="h6" align="center">
                  Não há registros de dados para este dia.
                </Typography>
              )}
            </Grid>
          </Grid>          
        </Grid>
        {hasParameters && (
        <Grid container >
          <Grid container item xs={2} justifyContent="center" alignItems="center">
            <Stack spacing={3}>
              <Grid item>
                <Typography variant="body2" align="center">
                  Selecione o intervalo de datas:
                </Typography>
              </Grid>

              <Grid item>
                <TextField
                  id="date-start"
                  label="Data de início"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={startDate}
                  onChange={(e) => {
                    setStartDate(e.target.value);
                    /* setFilteredData(null); */
                  }}
                />
              </Grid>
              <Grid item>
                <TextField
                  id="date-end"
                  label="Data final"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={endDate}
                  onChange={(e) => {
                    setEndDate(e.target.value);
                    /* setFilteredData(null); */
                  }}
                />
              </Grid>
            </Stack>
          </Grid>
          
          <Grid item xs={10}>
            {gridData ? (
              <LineChart data={chartData} title="Título" />
            ) : (
              <Typography variant="h6" align="center">
                Nenhuma estação selecionada.
              </Typography>
            )}
          </Grid>
        </Grid>
        )}
      </Stack>
    </Box>
  );
};
export default StationsDashboards;
