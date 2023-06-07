import { FaFolderPlus } from "react-icons/fa";
const { ipcRenderer } = window.require("electron");

function App() {
  const openDirectoryPicker = () => {
    ipcRenderer.send("openDirectoryPicker");
  };

  return (
    <div className="bg-neutral-900 text-white h-screen flex items-center justify-center">
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
}

export default App;
