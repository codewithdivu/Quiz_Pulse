import ReactApexChart from "react-apexcharts";
import { Box, Card, Typography } from "@mui/material";

export default function AppWidgetSummary({
  title,
  percent,
  total,
  chartColor,
  chartData,
}) {
  const chartOptions = {
    colors: [chartColor],
    chart: { sparkline: { enabled: true } },
    plotOptions: { bar: { columnWidth: "68%", borderRadius: 2 } },
    tooltip: {
      x: { show: false },
      y: {
        formatter: (seriesName) => seriesName,
        title: {
          formatter: () => "",
        },
      },
      marker: { show: false },
    },
  };

  return (
    <Card sx={{ display: "flex", alignItems: "center", p: 3 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2">{title}</Typography>

        <Typography variant="h3">{total}</Typography>
      </Box>

      <ReactApexChart
        type="bar"
        series={[{ data: chartData }]}
        options={chartOptions}
        width={60}
        height={36}
      />
    </Card>
  );
}
