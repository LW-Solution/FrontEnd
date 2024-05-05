import { LineChart } from '@mui/x-charts/LineChart';

interface LineChartProps {
  data: (string | number)[][];
}

export default function DashLineChart({ data }: LineChartProps) {
  if (!data[0]) {
    return null; // ou renderize algum tipo de componente de carregamento ou erro aqui
  }

  // Primeiro, separamos os rótulos (datas) dos dados reais
  let labels = data.map((item) => {
    let dateTime = item[0];
    if (dateTime instanceof Date) {
      dateTime = dateTime.toISOString();
    }
    if (typeof dateTime !== 'string') {
      throw new Error('dateTime deve ser uma string ou um objeto Date');
    }
    const date = dateTime.split('T')[0]; // supondo que a data e a hora estejam separadas por um 'T'
    return date;
  });

  // Se houver apenas um dia de dados, adicionamos um rótulo vazio no início e no final
  if (labels.length === 1) {
    labels = ['', ...labels, ''];
  }

  // Em seguida, formatamos os dados para o formato esperado pela biblioteca
  const series = data[0].slice(1).map((key, i) => ({
    data: data.slice(1).map((item) => item[i + 1] as number),
    label: key as string,
  }));

  return (
    <LineChart
      width={800}
      height={300}
      series={series}
      xAxis={[{ scaleType: 'point', data: labels }]}
    />
  );
}