import { Chart } from "react-google-charts";

interface LineChartProps {
  data: (string | number)[][];
  title: string;
}

export function LineChart({ data, title }: LineChartProps) {
  const formattedData = data.map(row => {
    const date = new Date(row[0] as string);
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    return [formattedDate, ...row.slice(1)];
  });

  const options = {
    title,
    curveType: "function",
    legend: { position: "bottom" },
    hAxis: {
      format: 'dd/MM/yyyy',
    },
  };

  return (
    <Chart
      chartType="LineChart"
      width="100%"
      height="300px"
      data={formattedData}
      options={options}
    />
  );
}