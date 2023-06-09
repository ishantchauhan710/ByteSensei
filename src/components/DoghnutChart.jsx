import React, { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { FaSave } from "react-icons/fa";

const DoghnutChart = ({ data, download }) => {
  const [chartData, setChartData] = useState({
    labels: Object.entries(data.data).map((item) => item[0]),
    datasets: [
      {
        label: "Total Lines Of Code",
        data: Object.entries(data.data).map((item) => item[1].code),
        backgroundColor: [
          "#d8b4fe",
          "#86efac",
          "#f87171",
          "#fde047",
          "#7dd3fc",
        ],
        borderColor: "black",
        borderWidth: 1,
        strokeColor: "white",
      },
    ],
  });

  return (
    <div className="mt-4">
      <div className="w-6/12 flex item-center justify-center flex-col m-auto min-h-[600px]">
        <Doughnut
          id="appDoghnutChart"
          data={chartData}
          options={{
            plugins: {
              title: {
                display: true,
                text: "Pie Chart",
              },
              datalabels: {
                //formatter: (val, ctx) => ctx.chart.data.labels[ctx.dataIndex],
                formatter: (val, ctx) =>
                  Math.round((val / data.SUM.code) * 100) + "%",
              },
            },
          }}
        />
      </div>
      <div className="flex items-center justify-end mx-2 mt-3">
        <button
          onClick={() => download("appDoghnutChart")}
          className="bg-neutral-700 hover:bg-neutral-600 text-grey-darkest font-bold py-3 px-4 rounded inline-flex items-center"
        >
          <FaSave className="text-lg mr-2" />
          <span className="text-sm">Export</span>
        </button>
      </div>
    </div>
  );
};

export default DoghnutChart;
