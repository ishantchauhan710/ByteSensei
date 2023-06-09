import React, { useEffect, useState } from "react";
import { FaSave } from "react-icons/fa";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import BasicTable from "../components/BasicTable";
import AppChart from "../components/AppChart";
import { FcFolder } from "react-icons/fc";
import Header from "../components/Header";
import AdvancedTable from "../components/AdvancedTable";

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
      <AppChart data={results} />
      <AdvancedTable data={advancedResults} />
    </div>
  );
};

export default Analytics;
