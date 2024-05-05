import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IData } from "../../types";
import { LineChart } from "../../components/Charts/LineChart";
import Grid from "@mui/material/Grid";
import DashCard from "../../components/DashCard";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudRain } from "@fortawesome/free-solid-svg-icons";
import { Box, Button, Stack, TextField } from "@mui/material";
//vento - import AirIcon from '@mui/icons-material/Air';


const StationsDashboards = () => {
  const { id_station } = useParams();
  const [data, setData] = useState<IData | null>(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [chartData, setChartData] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await window.stations3001.get(
          `dashboard/${id_station}`
        );
        setData(response.data);
      } catch (error) {
        console.error("Erro da requisição:", error);
      }
    };
    fetchData();
  }, [id_station]);

  const sendDate = async () => {
    try {
      const response = await window.stations3001.get(
        `dashboard/bydate/${startDate}/${endDate}/${id_station}`
      );
      setChartData(response.data);
      console.log(response.data, response, startDate, endDate, id_station)
    } catch (error) {
      console.error("Erro da requisição:", error);
    }
  };
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Stack spacing={2}>
        <Grid container spacing={1}>
          <Grid item xs={10}>
            <Grid container direction="row" justifyContent="center" spacing={2}>
              <Grid item>
                <DashCard
                  icon={<FontAwesomeIcon icon={faCloudRain} />}
                  med={0}
                  min={0}
                  max={0}
                  subtitle=""
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={2}>
            <Stack spacing={2}>
              <Grid item>
                <TextField
                  id="date-start"
                  label="Data de início"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => setStartDate(e.target.value)}
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
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </Grid>
              <Grid item>
                <Button variant="contained" color="primary" onClick={sendDate}>
                  Buscar dados
                </Button>
              </Grid>
            </Stack>
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={8}>
            <LineChart data={chartData || []} title="Título" />
          </Grid>
          <Grid item xs={4}>
            TESTE
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
};
export default StationsDashboards;
