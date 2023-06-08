import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Label } from "chartjs-plugin-labels";
import { useState } from "react";
import { Doughnut, Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { FaSave } from "react-icons/fa";

Chart.register(CategoryScale);
Chart.register(ChartDataLabels);

const PieChart = ({ data }) => {
  const [chartData, setChartData] = useState({
    labels: Object.entries(data.data).map((item) => item[0]),
    datasets: [
      {
        label: "Total Lines Of Code",
        data: Object.entries(data.data).map((item) => item[1].code),
        backgroundColor: [
          "#f87171",
          "#fde047",
          "#7dd3fc",
          "#86efac",
          "#d8b4fe",
        ],
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  });

  return (
    <>
      <div className="w-1/2 m-auto">
        <Doughnut
          data={chartData}
          options={{
            plugins: {
              title: {
                display: true,
                text: "Pie Chart",
              },
              datalabels: {
                formatter: (val, ctx) => ctx.chart.data.labels[ctx.dataIndex],
              },
            },
          }}
        />
      </div>
      <div className="flex items-center justify-end mx-2 my-3">
        <button class="bg-neutral-950/80 hover:bg-neutral-950 text-grey-darkest font-bold py-3 px-4 rounded inline-flex items-center">
          <FaSave className="text-lg mr-2" />
          <span className="text-sm">Export</span>
        </button>
      </div>
    </>
  );
};

export default PieChart;
