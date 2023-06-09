import React from "react";
import { FaSave } from "react-icons/fa";

const AdvancedTable = ({ data, download }) => {
  return (
    <div className="mt-4">
      <div className="text-2xl font-bold py-2 flex items-center">
        Advance Details
      </div>
      <div id="advancedTable" className="relative overflow-x-auto">
        <table className="w-full text-sm text-neutral-400 text-center">
          <thead className="text-xs  uppercase bg-neutral-700 text-neutral-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                File Name
              </th>
              <th scope="col" className="px-6 py-3">
                Language
              </th>
              <th scope="col" className="px-6 py-3">
                Lines Of Code
              </th>
              <th scope="col" className="px-6 py-3">
                Comments
              </th>
              <th scope="col" className="px-6 py-3">
                Blank
              </th>
              <th scope="col" className="px-6 py-3">
                Percentage
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(data.data).map((item) => (
              <tr className="border-b bg-neutral-800 border-neutral-700 hover:bg-neutral-600/50 cursor-pointer">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium whitespace-nowrap w-2 overflow-hidden text-white text-left"
                  title={item[0]}
                >
                  {item[0].replace(/^.*[\\\/]/, "")}
                </th>
                <td className="px-6 py-4">{item[1].language}</td>
                <td className="px-6 py-4">{item[1].code}</td>
                <td className="px-6 py-4">{item[1].comment}</td>
                <td className="px-6 py-4">{item[1].blank}</td>
                <td className="px-6 py-4">
                  {parseFloat((item[1].code / data.SUM.code) * 100).toFixed(2)}%
                </td>
              </tr>
            ))}
            <tr className="border-b bg-neutral-700/30 border-neutral-700 cursor-pointer">
              <th
                scope="row"
                className="px-6 py-4 font-medium  whitespace-nowrap text-white"
              >
                SUM
              </th>
              <td className="px-6 py-4">-</td>
              <td className="px-6 py-4">{data.SUM.code}</td>
              <td className="px-6 py-4">{data.SUM.comment}</td>
              <td className="px-6 py-4">{data.SUM.blank}</td>
              <td className="px-6 py-4">100%</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-end mx-2 my-3">
        <button
          onClick={() => download("advancedTable")}
          className="bg-neutral-700 hover:bg-neutral-600 text-grey-darkest font-bold py-3 px-4 rounded inline-flex items-center"
        >
          <FaSave className="text-lg mr-2" />
          <span className="text-sm">Export</span>
        </button>
      </div>
    </div>
  );
};

export default AdvancedTable;
