import { PieChart } from "@mui/x-charts";
import React from "react";

const PieChartComponent = ({ title, total, data }) => {
  return (
    <div className="flex flex-row h-full items-center bg-gray-200 dark:bg-gray-700 dark:text-white">
      <div className="ml-20 fixed text-2xl font-semibold text-black">
        {title}{" "}
        <span className="text-xl text-blue-gray-500">
          / Total: {total.toFixed(2)}
        </span>
      </div>
      <PieChart
        margin={{ top: 100, bottom: 100, left: 100, right: 100 }}
        slotProps={{
          legend: {
            hidden: false,
            direction: "column",
            position: { vertical: "middle", horizontal: "right" },
            padding: -220,
          },
        }}
        series={[
          {
            data: data,
            innerRadius: 50,
            outerRadius: 80,
            paddingAngle: 5,
            cornerRadius: 5,
            startAngle: 180,
            endAngle: -180,
            highlightScope: { faded: "global", highlighted: "item" },
            faded: {
              innerRadius: 30,
              additionalRadius: -30,
              color: "gray",
            },
          },
        ]}
        height={600}
        width={400}
      />
    </div>
  );
};

export default PieChartComponent;
