import React, { useEffect, useState } from "react";
import { FaSave } from "react-icons/fa";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import Table from "../components/Table";
import PieChart from "../components/PieChart";

const Analytics = ({ data }) => {
  const processData = () => {
    const newObj = Object.assign({}, data);
    delete newObj.header;
    const sum = newObj.SUM;
    delete newObj.SUM;
    return {
      data: newObj,
      SUM: sum,
    };
  };

  const [results, setResults] = useState(processData(data));

  return (
    <div className="bg-neutral-800 text-white">
      <Table data={results} />
      <PieChart data={results} />
      
    </div>
  );
};

export default Analytics;
