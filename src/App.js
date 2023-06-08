import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./screens/Home";
import Analytics from "./screens/Analytics";
import { useState } from "react";

function App() {
  const [data, setData] = useState({
    header: {
      cloc_url: "github.com/AlDanial/cloc",
      cloc_version: "1.96",
      elapsed_seconds: 0.178092002868652,
      n_files: 5,
      n_lines: 510,
      files_per_second: 28.0753763193266,
      lines_per_second: 2863.68838457131,
    },
    JavaScript: { nFiles: 2, blank: 31, comment: 26, code: 216 },
    CSS: { nFiles: 1, blank: 21, comment: 0, code: 135 },
    HTML: { nFiles: 1, blank: 3, comment: 0, code: 59 },
    JSON: { nFiles: 1, blank: 0, comment: 0, code: 19 },
    SUM: { blank: 55, comment: 26, code: 429, nFiles: 5 },
  });
  const router = createBrowserRouter([
    {
      path: "/ishant",
      element: <Home setData={setData} />,
    },
    {
      path: "/",
      element: <Analytics data={data} />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
