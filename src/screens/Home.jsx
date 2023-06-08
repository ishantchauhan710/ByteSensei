import React from "react";
import { useEffect } from "react";
import { FaFolderPlus } from "react-icons/fa";
import { FcFolder } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { BsGithub } from "react-icons/bs";
import { BiExit } from "react-icons/bi";
const { ipcRenderer, shell } = window.require("electron");
const Home = ({ setData, setLoading }) => {
  const navigate = useNavigate();

  useEffect(() => {
    ipcRenderer.on("results", (e, data) => {
      setLoading(false);
      if (data.appMsg && data.appMsg === "cancelled") {
        console.log("No file selected");
      } else {
        if (!data.nFiles) {
          alert(
            "Unable to process this folder. Either the selected folder is empty, or it does not contain any programming scripts"
          );
        } else {
          //alert(JSON.stringify(data));
          setData(data);
          navigate("/analytics");
        }
      }
    });
  }, []);

  const openDirectoryPicker = () => {
    setLoading(true);
    ipcRenderer.send("openDirectoryPicker");
  };

  const openDocs = () => {
    shell.openExternal("https://www.github.com/ishantchauhan710/ByteSensei");
  };

  const closeApp = () => {
    ipcRenderer.send("closeApp");
  };

  return (
    <div className="bg-neutral-800 text-white h-screen flex items-center justify-center">
      <div className="w-2/3 h-1/2 flex items-center justify-center flex-col">
        <div className="text-5xl font-bold py-2 flex items-center mb-6">
          <FcFolder className="mr-2 text-6xl" />
          ByteSensei
        </div>

        <div
          onClick={openDirectoryPicker}
          className="w-1/2 py-3.5 text-2xl bg-neutral-700 rounded-md flex items-center justify-center cursor-pointer hover:bg-neutral-900"
        >
          <FaFolderPlus />
          <div className="ml-3 text-lg">Select a folder</div>
        </div>

        <div
          onClick={openDocs}
          className="mt-3 w-1/2 py-3.5 text-2xl bg-neutral-700 rounded-md flex items-center justify-center cursor-pointer hover:bg-neutral-900"
        >
          <BsGithub />
          <div className="ml-3 text-lg">Documentation</div>
        </div>

        <div
          onClick={closeApp}
          className="mt-3 w-1/2 py-3.5 text-2xl bg-neutral-700 rounded-md flex items-center justify-center cursor-pointer hover:bg-neutral-900"
        >
          <BiExit />
          <div className="ml-3 text-lg">Quit ByteSensei</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
