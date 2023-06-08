const { app, ipcMain, dialog, BrowserWindow } = require("electron");
const path = require("path");
const execa = require("execa");

const calculateResults = async (folder) => {
  const { stdout, stderr, code, failed, killed, signal, timedOut } =
    await execa("node_modules/.bin/cloc", [folder, "--json"]);

  if (stderr !== "") throw new Error(stderr.trim());
  if (code !== 0) throw new Error("Unexpected returned code : " + code);
  if (failed !== false) throw new Error("Failure");
  if (killed !== false) throw new Error("Program was killed");
  if (signal !== null) throw new Error("Uncatched signal");
  if (timedOut !== false) throw new Error("Timeout");

  return JSON.parse(stdout);
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
          calculateResults(response.filePaths[0]).then(
            (res) => {
              win.webContents.send("results", res);
              console.log("SUCCESS");
            },
            (err) => console.log(err)
          );

          console.log(response.filePaths[0]);
        } else {
          console.log("no file selected");
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
