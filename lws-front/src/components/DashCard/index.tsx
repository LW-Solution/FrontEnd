import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CountUp from "react-countup";

interface DashCardProps {
  icon: ReactNode;
  med: number;
  min: number;
  max: number;  
  subtitle: string;
}

export default function DashCard({ icon, med, min, max, subtitle }: DashCardProps) {
  return (
    <Card sx={{ height: 19 + "vh" }} className="gradient">
      <CardContent>
  <Grid container direction="column" alignItems="center">
    <Grid item>
      {icon}
    </Grid>
    <Grid container item justifyContent="space-around" alignItems="center">
      <Grid item>
        <div>
          <CountUp delay={0.4} end={med} duration={0.6} />
          <p>Med.</p>
        </div>
      </Grid>
      <Grid item>
        <div>
          <CountUp delay={0.4} end={min} duration={0.6} />
          <p>Min.</p>
        </div>
      </Grid>
      <Grid item>
        <div>
          <CountUp delay={0.4} end={max} duration={0.6} />
          <p>Máx.</p>
        </div>
      </Grid>
    </Grid>
    <Grid item>
      <Typography
        gutterBottom
        variant="body2"
        component="div"
        sx={{ color: "#ccd1d1" }}
      >
        {subtitle}
      </Typography>
    </Grid>
  </Grid>
</CardContent>
    </Card>
  );
}
