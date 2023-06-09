import React, { useEffect, useState } from "react";
import { FaSave } from "react-icons/fa";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import BasicTable from "../components/BasicTable";
import BarChart from "../components/BarChart";
import { FcFolder } from "react-icons/fc";
import Header from "../components/Header";
import AdvancedTable from "../components/AdvancedTable";
import DoghnutChart from "../components/DoghnutChart";

const Analytics = ({ data }) => {
  const processData = () => {
    const newObj = Object.assign({}, data.basic);
    delete newObj.header;
    const sum = newObj.SUM;
    delete newObj.SUM;
    return {
      data: newObj,
      SUM: sum,
    };
  };

  const processAdvancedResults = () => {
    const newObj = Object.assign({}, data.advanced.by_file);
    delete newObj.header;
    const sum = newObj.SUM;
    delete newObj.SUM;
    return {
      data: newObj,
      SUM: sum,
    };
  };

  const [results, setResults] = useState(processData(data));
  const [advancedResults, setAdvancedResults] = useState(
    processAdvancedResults(data)
  );

  return (
    <div className="bg-neutral-800 text-white p-4">
      <Header />
      <BasicTable data={results} />
      <BarChart data={results} />
      <AdvancedTable data={advancedResults} />
      <DoghnutChart data={results} />
    </div>
  );
};

export default Analytics;
