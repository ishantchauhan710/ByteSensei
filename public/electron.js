const { app, ipcMain, dialog, BrowserWindow } = require("electron");
const util = require("node:util");
const exec = util.promisify(require("node:child_process").exec);
const Store = require("electron-store");
Store.initRenderer();

const calculateResults = async (folder, excludeDirs) => {
  console.log("Folder: ", folder);

  console.log(excludeDirs.dirs);
  console.log(excludeDirs.files);

  let dirCommand = "";
  let fileCommand = "";

  if (excludeDirs.dirs && excludeDirs.dirs.length > 0) {
    const dirsRegex = `"(${excludeDirs.dirs.join("|")})"`;
    dirCommand = `--not-match-d=${dirsRegex}`;
  }

  if (excludeDirs.files && excludeDirs.files.length > 0) {
    const filesRegex = `"(${excludeDirs.files.join("|")})"`;
    fileCommand = `--not-match-f=${filesRegex}`;
  }

  const { error, stdout, stderr } = await exec(
    `cloc --json --fullpath --by-file-by-lang  ${dirCommand} ${fileCommand} ${folder}`
  );

  if (stdout) {
    console.log(stdout);
    return JSON.parse(stdout);
  }
  if (error) {
    console.log("Error: ", error);
  }
  if (stderr) {
    console.log("Error");
  }
  return {};
};

function createWindow() {
  const win = new BrowserWindow({
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.setMenu(null);

  win.loadURL("http://localhost:3000");
  //win.webContents.openDevTools();

  ipcMain.on("openDirectoryPicker", (event, args) => {
    dialog
      .showOpenDialog({ properties: ["openDirectory"] })
      .then(function (response) {
        if (!response.canceled) {
          const dirPath = response.filePaths[0];
          calculateResults(dirPath, args.excludeDirs).then(
            (res) => {
              res.appDir = dirPath;
              win.webContents.send("results", res);
              console.log("SUCCESS");
              console.log(res);
            },
            (err) => {
              win.webContents.send("results", {});
              console.log(err);
            }
          );

          console.log(response.filePaths[0]);
        } else {
          win.webContents.send("results", { appMsg: "cancelled" });
        }
      });
  });

  ipcMain.on("closeApp", (event, args) => {
    if (app) {
      app.quit();
    }
  });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
