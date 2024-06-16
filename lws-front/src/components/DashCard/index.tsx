import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CountUp from "react-countup";
import { DashCardProps } from "../../types/dashTypes";
import "./style.scss";

export default function DashCard({
  med,
  min,
  max,
  title,
  unit,
  onClick,
}: DashCardProps) {
  return (
    <Card sx={{ height: "13vh" }} className="gradient" onClick={onClick}>
      <CardContent>
        <Grid container direction="column" alignItems="center">
          <Grid item>
            <Typography
              gutterBottom
              variant="body1"
              component="div"
              sx={{ color: "#fff" }}
              className="title"
            >
              {title} ({unit})
            </Typography>
          </Grid>
          <Grid
            container
            item
            justifyContent="space-around"
            alignItems="center"            
            spacing={2}
            sx={{ color: "#ccd1d1" }}
          >
            <Grid item >
              <div className="text-center">
                <CountUp delay={0.4} end={med} duration={0.6} />
                <p>Med.</p>
              </div>
            </Grid>
            <Grid item>
              <div className="text-center">
                <CountUp delay={0.4} end={min} duration={0.6} />
                <p>Min.</p>
              </div>
            </Grid>
            <Grid item>
              <div className="text-center">
                <CountUp delay={0.4} end={max} duration={0.6} />
                <p>Máx.</p>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
