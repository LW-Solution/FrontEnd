import { Chart } from "react-google-charts";

interface LineChartProps {
  data: (string | number)[][];
  title: string;
}

export function LineChart({ data, title }: LineChartProps) {
  const options = {
    title,
    curveType: "function",
    legend: { position: "bottom" },
  };

  return (
    <Chart
      chartType="LineChart"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
  );
}