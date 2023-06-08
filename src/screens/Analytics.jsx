import React, { useEffect, useState } from "react";
import { FaSave } from "react-icons/fa";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import Table from "../components/Table";
import AppChart from "../components/AppChart";
import { FcFolder } from "react-icons/fc";
import Header from "../components/Header";

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
    <div className="bg-neutral-800 text-white p-4">
      <Header />

      <Table data={results} />
      <AppChart data={results} />
    </div>
  );
};

export default Analytics;
