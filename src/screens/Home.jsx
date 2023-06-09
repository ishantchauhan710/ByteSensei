import React, { useState } from "react";
import { useEffect } from "react";
import { FaFolderPlus } from "react-icons/fa";
import { FcFolder } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { BsGithub } from "react-icons/bs";
import { BiExit } from "react-icons/bi";
import { IoMdSettings } from "react-icons/io";

const { ipcRenderer, shell } = window.require("electron");
const Home = ({
  setData,
  setLoading,
  setShowExcludeDialog,
  dirsToExclude,
  filesToExclude,
}) => {
  const navigate = useNavigate();
  const [shouldNavigate, setShouldNavigate] = useState(false);
  useEffect(() => {
    setData({});
    ipcRenderer.on("results", (e, data) => {
      setLoading(false);
      if (data && data.appMsg) {
        console.log("No file selected");
      } else {
        if (!data.header) {
          alert(
            "Unable to process this folder. Either the selected folder is empty, or it does not contain any programming scripts. Also ensure that the list of excluded directories only contain name or relative paths of files and folders and not any special characters / symbols. Refer to docs for more details"
          );
        } else {
          //alert(JSON.stringify(data));
          setData(data);
          setShouldNavigate(true);
        }
      }
    });
  }, []);

  useEffect(() => {
    if (shouldNavigate) {
      navigate("/analytics");
      setShouldNavigate(false);
    }
  }, [shouldNavigate]);

  const openDirectoryPicker = () => {
    setLoading(true);
    ipcRenderer.send("openDirectoryPicker", {
      excludeDirs: { dirs: dirsToExclude, files: filesToExclude },
    });
  };

  const excludeFolders = () => {
    setShowExcludeDialog(true);
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
          onClick={excludeFolders}
          className="mt-3 w-1/2 py-3.5 text-2xl bg-neutral-700 rounded-md flex items-center justify-center cursor-pointer hover:bg-neutral-900"
        >
          <IoMdSettings />
          <div className="ml-3 text-lg">Exclude Folders</div>
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
