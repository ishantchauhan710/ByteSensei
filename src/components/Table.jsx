import React from "react";
import { FaSave } from "react-icons/fa";

const Table = ({ data }) => {
  return (
    <div className="mt-4">
      <div className="text-2xl font-bold py-2 flex items-center">
        Basic Details
      </div>
      <div class="relative overflow-x-auto">
        <table class="w-full text-sm text-neutral-400 text-center">
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
              <th scope="col" class="px-6 py-3">
                Percentage
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(data.data).map((item) => (
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
                <td class="px-6 py-4">{parseFloat((item[1].code/data.SUM.code)*100).toFixed(2)}%</td>               
              </tr>
            ))}
            <tr class="border-b bg-neutral-700/30 border-neutral-700 cursor-pointer">
              <th
                scope="row"
                class="px-6 py-4 font-medium  whitespace-nowrap text-white"
              >
                SUM
              </th>
              <td class="px-6 py-4">{data.SUM.nFiles}</td>
              <td class="px-6 py-4">{data.SUM.code}</td>
              <td class="px-6 py-4">{data.SUM.comment}</td>
              <td class="px-6 py-4">{data.SUM.blank}</td>
              <td class="px-6 py-4">100%</td>
  
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-end mx-2 my-3">
        <button class="bg-neutral-700 hover:bg-neutral-600 text-grey-darkest font-bold py-3 px-4 rounded inline-flex items-center">
          <FaSave className="text-lg mr-2" />
          <span className="text-sm">Export</span>
        </button>
      </div>
    </div>
  );
};

export default Table;
