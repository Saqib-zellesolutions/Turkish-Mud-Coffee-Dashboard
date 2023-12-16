import Stack from "@mui/material/Stack";
import { PieChart } from "@mui/x-charts/PieChart";
import * as React from "react";

export default function Chart({
  completedOrders,
  processingOrders,
  cancelOrders,
}) {
  const data = [
    { label: "Completed", value: completedOrders.length },
    { label: "Cancel", value: cancelOrders.length },
    { label: "Processing", value: processingOrders.length },
    //   { label: "Group D", value: 200 },
  ];
  return (
    <Stack direction="row">
      <PieChart
        series={[
          {
            paddingAngle: 5,
            innerRadius: 60,
            outerRadius: 80,
            data,
          },
        ]}
        margin={{ right: 5 }}
        // width={175}
        height={175}
        legend={{ hidden: true }}
      />
    </Stack>
  );
}
