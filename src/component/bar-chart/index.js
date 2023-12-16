import { useTheme } from "@mui/material/styles";
import React from "react";
import ApexCharts from "react-apexcharts";
function BarCharts({ data, labels }) {
  const theme = useTheme();
  // Check if data and labels are arrays and have the same length
  if (
    !Array.isArray(data) ||
    !Array.isArray(labels) ||
    data.length !== labels.length
  ) {
    return <p>No data available.</p>;
  }

  // Ensure that the data is numeric and not NaN
  const numericData = data.map((item) =>
    typeof item === "number" && !isNaN(item) ? item : 0
  );
  const options = {
    chart: {
      background: theme,
      stacked: false,
      toolbar: {
        show: false,
      },
    },
    // colors: [
    //   theme.palette.primary.main,
    //   alpha(theme.palette.primary.main, 0.25),
    // ],
    dataLabels: {
      enabled: false,
    },
    fill: {
      opacity: 1,
      type: "solid",
    },
    grid: {
      borderColor: "rgba(203, 204, 210, 0.5)",
      strokeDashArray: 2,
    },
    legend: {
      show: false,
    },
    plotOptions: {
      bar: {
        columnWidth: "40px",
        borderRadius: 10,
      },
    },
    stroke: {
      colors: ["transparent"],
      show: true,
      width: 2,
    },
    theme: {
      mode: theme.palette.mode,
    },
    series: [
      {
        name: "Order Place",
        data: numericData,
      },
    ],
    xaxis: {
      categories: labels,
      labels: {
        style: {
          colors: "rgba(203, 204, 210, 0.5)",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "rgba(203, 204, 210, 0.5)", // Change this to your desired label color
        },
      },
    },
  };
  return (
    // <div className="App">
    <ApexCharts
      options={options}
      series={options.series}
      type="bar"
      // width={300}
      height={240}
    />
    // </div>
  );
}

export default BarCharts;
