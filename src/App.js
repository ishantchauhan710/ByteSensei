import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./screens/Home";
import Analytics from "./screens/Analytics";
import { useState } from "react";
import ReactLoading from "react-loading";

function App() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home setData={setData} setLoading={setLoading} />,
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
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
