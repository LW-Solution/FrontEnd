import { Chart } from "react-google-charts";

interface LineChartProps {
  data: (string | number)[][];
  title: string;
}

export function BarChart({ data, title }: LineChartProps) {
  const formattedData = data.map((row) => {
    const date = new Date(row[0] as string);
    let formattedDate = "";
    if (!isNaN(date.getTime())) {
      // Verifica se a data é válida
      formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    }
    return [formattedDate, ...row.slice(1)];
  });

  const options = {
    chart: {
      title: title,
    },
    colors: ["#CBDAD5", "#89A7B1", "#3A415A", "#7469B6", "#FFE6E6"],
  };

  return (
    <Chart
      chartType="Bar"
      width="100%"
      height="400px"
      data={formattedData}
      options={options}
    />
  );
}
