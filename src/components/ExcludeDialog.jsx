import React, { useState } from "react";

const ExcludeDialog = ({
  show,
  setShow,
  dirsToExclude,
  setDirsToExclude,
  filesToExclude,
  setFilesToExclude,
}) => {
  const [dirsContent, setDirsContent] = useState(dirsToExclude.join("\n"));
  const [filesContent, setFilesContent] = useState(filesToExclude.join("\n"));

  const save = () => {
    if (!dirsContent) {
      setDirsToExclude([]);
    } else {
      const dirs = dirsContent.replace(/(^[ \t]*\n)/gm, "").split("\n");
      setDirsToExclude(dirs);
      //alert(dirs);
    }

    if (!filesContent) {
      setFilesToExclude([]);
    } else {
      const files = filesContent.replace(/(^[ \t]*\n)/gm, "").split("\n");
      setFilesToExclude(files);
      //alert(files);
    }

    setShow(false);
  };

  return (
    <div className="w-screen h-screen fixed bg-gray-900/60 flex items-center justify-center">
      <div className="relative w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow">
          <div className="flex items-start justify-between p-4 border-b rounded-t ">
            <h3 className="text-xl font-semibold text-gray-900 ">
              Exclude Directories
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
              onClick={() => setShow(false)}
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="px-6 py-3 flex items-center">
            <textarea
              rows={10}
              className="mr-1 w-full resize-none border border-gray-300 rounded-sm p-2 focus:outline-none"
              placeholder="List of directories to exclude (Line by line)"
              value={dirsContent}
              onChange={(e) => setDirsContent(e.target.value)}
            />
            <textarea
              rows={10}
              className="ml-1 w-full resize-none border border-gray-300 rounded-sm p-2 focus:outline-none"
              placeholder="List of files to exclude (Line by line)"
              value={filesContent}
              onChange={(e) => setFilesContent(e.target.value)}
            />
          </div>
          <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b ">
            <button
              onClick={save}
              type="button"
              className="text-white bg-gray-800 hover:bg-gray-900  font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Apply
            </button>
            <button
              data-modal-hide="defaultModal"
              type="button"
              className="text-gray-500 bg-white hover:bg-gray-100  rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
            >
              NodeJs
            </button>
            <button
              data-modal-hide="defaultModal"
              type="button"
              className="text-gray-500 bg-white hover:bg-gray-100  rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
            >
              Android
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExcludeDialog;
