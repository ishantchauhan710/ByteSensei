import {
  BrowserRouter,
  Route,
  Routes,
  HashRouter
} from "react-router-dom";
import Home from "./screens/Home";
import Analytics from "./screens/Analytics";
import { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import ExcludeDialog from "./components/ExcludeDialog";
const Store = window.require("electron-store");
const store = new Store();

function App() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [showExcludeDialog, setShowExcludeDialog] = useState(false);
  const [dirsToExclude, setDirsToExclude] = useState([]);
  const [filesToExclude, setFilesToExclude] = useState([]);

  useEffect(() => {
    let dirsData = store.get("dirsToExclude");
    if (dirsData) {
      const dirs = dirsData.split(",");
      setDirsToExclude(dirs);
    }

    let filesData = store.get("filesToExclude");
    if (filesData) {
      const files = filesData.split(",");
      setFilesToExclude(files);
    }

    let isPreviouslyUsed = store.get("isPreviouslyUsed");
    if (!isPreviouslyUsed) {
      setDirsToExclude(["node_modules"]);
      setFilesToExclude([".env", "package.json", "package-lock.json"]);
      store.set("isPreviouslyUsed", true);
    }
  }, []);

  useEffect(() => {
    store.set("dirsToExclude", dirsToExclude.toString());
  }, [dirsToExclude]);

  useEffect(() => {
    store.set("filesToExclude", filesToExclude.toString());
  }, [filesToExclude]);

  return (
    <div>
      {loading && (
        <div className="w-screen h-screen fixed bg-gray-900/60 flex items-center justify-center">
          <div>
            <ReactLoading type="spin" color="white" />
          </div>
        </div>
      )}
      {showExcludeDialog && (
        <ExcludeDialog
          show={showExcludeDialog}
          setShow={setShowExcludeDialog}
          dirsToExclude={dirsToExclude}
          setDirsToExclude={setDirsToExclude}
          filesToExclude={filesToExclude}
          setFilesToExclude={setFilesToExclude}
        />
      )}
      <HashRouter>
        <Routes>
          <Route
            path="/"
            exact
            element={
              <Home
                setData={setData}
                setLoading={setLoading}
                setShowExcludeDialog={setShowExcludeDialog}
                dirsToExclude={dirsToExclude}
                filesToExclude={filesToExclude}
              />
            }
          />
          <Route path="/analytics" element={<Analytics data={data} />} />
          <Route
            path="*"
            element={<div>ByteSensei Error: Page not found</div>}
          />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
