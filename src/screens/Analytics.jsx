import { useEffect, useState } from "react";
import { FaSave } from "react-icons/fa";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import BasicTable from "../components/BasicTable";
import BarChart from "../components/BarChart";
import { FcFolder } from "react-icons/fc";
import Header from "../components/Header";
import AdvancedTable from "../components/AdvancedTable";
import DoghnutChart from "../components/DoghnutChart";
import { download } from "downloadjs";
import { toPng } from "html-to-image";

const Analytics = ({ data }) => {
  const downloadImage = (node) => {
    toPng(document.getElementById(node)).then(function (dataUrl) {
      const link = document.createElement("a");
      link.download = "image.png";
      link.href = dataUrl;
      link.click();
    });
  };

  const processData = () => {
    const newObj = Object.assign({}, data.by_lang);
    //delete newObj.header;
    const sum = newObj.SUM;
    delete newObj.SUM;
    return {
      data: newObj,
      SUM: sum,
    };
  };

  const processAdvancedResults = () => {
    const newObj = Object.assign({}, data.by_file);
    //delete newObj.header;
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
      <BasicTable data={results} download={downloadImage} />
      <BarChart data={results} download={downloadImage} />
      <AdvancedTable data={advancedResults} download={downloadImage} />
      <DoghnutChart data={results} download={downloadImage} />
    </div>
  );
};

export default Analytics;
