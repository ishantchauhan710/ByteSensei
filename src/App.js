import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./screens/Home";
import Analytics from "./screens/Analytics";
import { useState } from "react";
import ReactLoading from "react-loading";
import ExcludeDialog from "./components/ExcludeDialog";

function App() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [showExcludeDialog, setShowExcludeDialog] = useState(true);
  const [dirsToExclude, setDirsToExclude] = useState([]);
  const [filesToExclude, setFilesToExclude] = useState([]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Home
          setData={setData}
          setLoading={setLoading}
          setShowExcludeDialog={setShowExcludeDialog}
        />
      ),
    },
    {
      path: "/analytics",
      element: <Analytics data={data} />,
    },
  ]);

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
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
