import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Label } from "chartjs-plugin-labels";
import { useState } from "react";
import { Bar, Doughnut, Line, Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { FaSave } from "react-icons/fa";

Chart.register(CategoryScale);
Chart.register(ChartDataLabels);

const BarChart = ({ data }) => {
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
        strokeColor: "white",
      },
    ],
  });

  return (
    <div className="mt-4">
      <div className="w-9/12 lg:w-full flex item-center justify-center flex-col m-auto min-h-[400px]">
        <Bar
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              title: {
                display: true,
                text: "Bar Chart",
              },
              legend: {
                display: false,
              },
            },
          }}
        />
      </div>
      <div className="flex items-center justify-end mx-2 mt-3">
        <button class="bg-neutral-700 hover:bg-neutral-600 text-grey-darkest font-bold py-3 px-4 rounded inline-flex items-center">
          <FaSave className="text-lg mr-2" />
          <span className="text-sm">Export</span>
        </button>
      </div>
    </div>
  );
};

export default BarChart;
