import React from "react";
import { useEffect } from "react";
import { FaFolderPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const { ipcRenderer } = window.require("electron");

const Home = ({ setData }) => {
  const navigate = useNavigate();

  useEffect(() => {
    ipcRenderer.on("results", (e, data) => {
      //alert(JSON.stringify(data));
      setData(data);
      navigate("/analytics");
    });
  }, []);

  const openDirectoryPicker = () => {
    ipcRenderer.send("openDirectoryPicker");
  };

  return (
    <div className="bg-neutral-800 text-white h-screen flex items-center justify-center">
      <div className="w-1/2 h-1/2 flex items-center justify-center">
        <div
          onClick={openDirectoryPicker}
          className="w-1/2 h-[200px] text-7xl bg-neutral-950 rounded-md flex items-center justify-center flex-col cursor-pointer hover:bg-neutral-950/70"
        >
          <FaFolderPlus />
          <div className="mt-2 text-lg">Select a folder</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
