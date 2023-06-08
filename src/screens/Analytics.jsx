import React, { useEffect, useState } from "react";

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
    <div className="bg-neutral-800 text-white min-h-screen">
      <div class="relative overflow-x-auto">
        <table class="w-full text-sm text-lefttext-neutral-400 text-center">
          <thead class="text-xs  uppercase bg-neutral-700 text-neutral-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Language
              </th>
              <th scope="col" class="px-6 py-3">
                Total Files
              </th>
              <th scope="col" class="px-6 py-3">
                Lines Of Code
              </th>
              <th scope="col" class="px-6 py-3">
                Comments
              </th>
              <th scope="col" class="px-6 py-3">
                Blank
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(results.data).map((item) => (
              <tr class="border-b bg-neutral-800 border-neutral-700 hover:bg-neutral-600/50 cursor-pointer">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium  whitespace-nowrap text-white"
                >
                  {item[0]}
                </th>
                <td class="px-6 py-4">{item[1].nFiles}</td>
                <td class="px-6 py-4">{item[1].code}</td>
                <td class="px-6 py-4">{item[1].comment}</td>
                <td class="px-6 py-4">{item[1].blank}</td>
              </tr>
            ))}
            <tr class="border-b bg-neutral-700/30 border-neutral-700 cursor-pointer">
              <th
                scope="row"
                class="px-6 py-4 font-medium  whitespace-nowrap text-white"
              >
                SUM
              </th>
              <td class="px-6 py-4">{results.SUM.nFiles}</td>
              <td class="px-6 py-4">{results.SUM.code}</td>
              <td class="px-6 py-4">{results.SUM.comment}</td>
              <td class="px-6 py-4">{results.SUM.blank}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Analytics;
