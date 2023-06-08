import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./screens/Home";
import Analytics from "./screens/Analytics";
import { useState } from "react";

function App() {
  const [data, setData] = useState({});
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home setData={setData} />,
    },
    {
      path: "/analytics",
      element: <Analytics data={data} />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
