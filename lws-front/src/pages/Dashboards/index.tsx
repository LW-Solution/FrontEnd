import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IData } from "../../types";
import { LineChart } from "../../components/Charts/LineChart";
import Grid from "@mui/material/Grid";
import DashCard from "../../components/DashCard";
import { processDailyData } from "../../utils/dataProcess";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudRain } from "@fortawesome/free-solid-svg-icons";
import { Box, Stack } from "@mui/material";
//vento - import AirIcon from '@mui/icons-material/Air';

const StationsDashboards = () => {
  const { id_station } = useParams();
  const [data, setData] = useState<IData | null>(null);
  const processedData =
    data && data.measurements ? processDailyData(data.measurements) : null;

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

  const chartData = processedData
    ? [
        ["Data", "Valor"],
        ["Média", processedData.average],
        ["Máximo", processedData.max],
        ["Mínimo", processedData.min],
      ]
    : [];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Stack spacing={2}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Grid container direction="row" justifyContent="center" spacing={2}>
              <Grid item>
                <DashCard
                  icon={<FontAwesomeIcon icon={faCloudRain} />}
                  med={processedData ? processedData.average : 0}
                  min={processedData ? processedData.min : 0}
                  max={processedData ? processedData.max : 0}
                  subtitle="04/05/2024"
                />
              </Grid>
              <Grid item>
                <DashCard
                  icon={<FontAwesomeIcon icon={faCloudRain} />}
                  med={processedData ? processedData.average : 0}
                  min={processedData ? processedData.min : 0}
                  max={processedData ? processedData.max : 0}
                  subtitle="04/05/2024"
                />
              </Grid>
              <Grid item>
                <DashCard
                  icon={<FontAwesomeIcon icon={faCloudRain} />}
                  med={processedData ? processedData.average : 0}
                  min={processedData ? processedData.min : 0}
                  max={processedData ? processedData.max : 0}
                  subtitle="04/05/2024"
                />
              </Grid>
              <Grid item>
                <DashCard
                  icon={<FontAwesomeIcon icon={faCloudRain} />}
                  med={processedData ? processedData.average : 0}
                  min={processedData ? processedData.min : 0}
                  max={processedData ? processedData.max : 0}
                  subtitle="04/05/2024"
                />
              </Grid>
              <Grid item>
                <DashCard
                  icon={<FontAwesomeIcon icon={faCloudRain} />}
                  med={processedData ? processedData.average : 0}
                  min={processedData ? processedData.min : 0}
                  max={processedData ? processedData.max : 0}
                  subtitle="04/05/2024"
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            TESTE
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={8}>
            {processedData && data && data.measurements && (
              <LineChart
                data={chartData}
                title={data.measurements[0].parameter_type.parameter_name}
              />
            )}
          </Grid>
          <Grid item xs={4}>
            TESTE
          </Grid>
        </Grid>

        {/* <Grid container spacing={2}>
        <Grid item xs={8}>
          <Grid container direction="row" spacing={2}>
            <Grid item>
              <DashCard
                icon={<FontAwesomeIcon icon={faCloudRain} />}
                med={processedData ? processedData.average : 0}
                min={processedData ? processedData.min : 0}
                max={processedData ? processedData.max : 0}
                subtitle="04/05/2024"
              />
            </Grid>
            <Grid item>
              <DashCard
                icon={<FontAwesomeIcon icon={faCloudRain} />}
                med={processedData ? processedData.average : 0}
                min={processedData ? processedData.min : 0}
                max={processedData ? processedData.max : 0}
                subtitle="04/05/2024"
              />
            </Grid>
            <Grid item>
              <DashCard
                icon={<FontAwesomeIcon icon={faCloudRain} />}
                med={processedData ? processedData.average : 0}
                min={processedData ? processedData.min : 0}
                max={processedData ? processedData.max : 0}
                subtitle="04/05/2024"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={8}>
          <Grid container direction="row" spacing={2}>
            <Grid item xs={6}>
              TESTE
            </Grid>
            <Grid item xs={6}>
              {processedData && data && data.measurements && (
                <LineChart
                  data={chartData}
                  title={data.measurements[0].parameter_type.parameter_name}
                />
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid> */}
      </Stack>
    </Box>
  );
};

export default StationsDashboards;
